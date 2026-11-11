+++
title = 'Continuous integration'
linkTitle = 'Continuous integration'
weight = 40
description = 'The Jenkins checks each repository runs, driven by its yggdrasil.yml.'
+++

CI runs on **Jenkins**, through the owner's **yggdrasil** platform. Each repository declares its
checks in `yggdrasil.yml` — data, not code: pinned images, commands, archive globs and the names of
Jenkins credentials. Every command is a script under `ci/`, so you can run it on your own machine.

## API

```mermaid
flowchart TB
    PR(["Pull request / push<br/>develop · main"]) --> T & D & BP
    subgraph T["test — dotnet/sdk:10.0.402 · ci/test.sh"]
        direction TB
        t1[specification verification] --> t2[Python helper tests]
        t2 --> t3["protocol harness<br/>locked deps · audit · Java & Python suites · vectors"]
        t3 --> t4[restore and lease checks]
        t4 --> t5[vulnerability scan]
        t5 --> t6[Release build]
        t6 --> t7[OpenAPI drift check]
        t7 --> t8["all tests (.trx) + coverage"]
        t8 --> t9["coverage gate ≥ 90%"]
    end
    subgraph D["docker — docker:29.7.2-cli · ci/docker.sh"]
        d1[docker build]
    end
    subgraph BP["branchPolicy — python:3.14.9-alpine · ci/branch-policy.sh"]
        b1["verify_protocol.py<br/>(PRs into main)"]
    end
```

| Check | Runs | Archives |
| --- | --- | --- |
| `test` | `ci/test.sh` — needs Docker for Testcontainers; uses the `reportgenerator-license` credential when present | `docs/coverage-report/**`, `**/TestResults/*.trx` |
| `docker` | `ci/docker.sh` — the image can still be built | — |
| `branchPolicy` | `ci/branch-policy.sh` — the protocol review gate for pull requests into `main` | — |

Required checks are `branch-policy`, `test` and `docker`; `main` also requires
`deploy/production`. Cerberus is not yet an application in yggdrasil's catalog, so nothing is
deployed and a release pull request cannot pass yet.

## Client

| Check | Image | Runs |
| --- | --- | --- |
| `analyze-and-test` | `ghcr.io/cirruslabs/flutter` (for the Android SDK and JDK; `ci/flutter-env.sh` fetches the pinned Flutter 3.47.4) | actionlint → `flutter pub get --enforce-lockfile` → `dart format --set-exit-if-changed` → `flutter analyze` → `tool/check_boundaries.dart` → `flutter test --coverage` → `tool/check_protocol_gate.dart`. Archives `coverage/lcov.info`. |
| `generated-drift` | — | Regenerates the API client, build_runner output, drift migrations and schema helpers and localizations, then fails on any `git diff`. |
| `web-bundle` | `docker:29.7.2-cli` | Builds the web image under a unique tag (running the bundle check), then removes it. |
| Release | owner `v*` tags | `ci/release-build.sh`: the tag must match `pubspec.yaml`; crypto tests and the gate check; builds web, APK, Linux and `.deb`. Windows is built by the `release-windows.yml` workflow. |

Checks run on every pull request into, and push to, `develop` and `main`.

## Running a check locally

Every check is a plain script:

```bash
ci/test.sh
ci/docker.sh
```

```bash
ci/analyze-and-test.sh
ci/generated-drift.sh
ci/web-bundle.sh
```
