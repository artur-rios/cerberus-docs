+++
title = 'Technology stack'
linkTitle = 'Technology stack'
weight = 20
description = 'The technologies and versions used by the Cerberus API and the Cerberus UI.'
+++

Each repository's `requirements/Technology Stack Document.md` is the single source of truth. The
versions below are those pinned at the time of writing.

## API

| Area | Technology |
| --- | --- |
| Platform | **.NET 10** (`net10.0`); SDK `10.0.100`, `rollForward: latestFeature`. Nullable, implicit usings, warnings as errors, deterministic builds; central package management with transitive pinning. |
| Web | ASP.NET Core, Swashbuckle.AspNetCore 10.3.0 (OpenAPI), Serilog.AspNetCore 10.0.0 |
| Data | EF Core 10.0.12, Npgsql.EntityFrameworkCore.PostgreSQL 10.0.3, Npgsql 10.0.3, EFCore.NamingConventions 10.0.1 — PostgreSQL only |
| Validation | FluentValidation 12.1.1, ArturRios.Validation 2.0.0 |
| Tokens | Microsoft.IdentityModel.JsonWebTokens 8.23.0, ArturRios.Jwt 1.2.0 |
| First-party libraries | ArturRios.Output 3.2.0, Mediator 2.0.0, Util 2.1.0, Extensions 1.4.0, Configuration 1.2.0, Logging 2.0.0, Data.Relational.Core 4.0.1, Data.PostgreSql 3.0.2, Util.WebApi 5.1.0 |
| Testing | xunit 2.9.3, Moq 4.21.0, Bogus 35.6.5, Testcontainers.PostgreSql 4.15.0, Microsoft.AspNetCore.Mvc.Testing 10.0.12, coverlet.collector 10.1.0, ArturRios.Util.Test 3.0.0 |
| Tooling | ReportGenerator 5.5.11; CPython 3.14.9 and Temurin JDK 25 for the protocol harnesses |
| Container | `mcr.microsoft.com/dotnet/sdk:10.0.402` → `mcr.microsoft.com/dotnet/aspnet:10.0.13`, pinned by digest |
| Hosting | Ubuntu VPS, Docker, Traefik |

Deliberately excluded: Dapper (unless measured performance justifies it), the SQLite, MySQL,
MongoDB and DynamoDB providers, and any messaging service.

## Client

| Area | Technology |
| --- | --- |
| Framework | **Flutter 3.47.4** (stable), Dart `^3.13.2` |
| State and DI | flutter_riverpod 3.4.3 |
| Routing | go_router 18.0.2 |
| HTTP | dio 5.11.1; generated client with swagger_parser 1.45.0, retrofit 4.10.0, json_serializable / json_annotation 4.12.0 |
| Local store | drift 2.35.2 over sqlite3 3.x (bundled through build hooks) |
| Secure storage | flutter_secure_storage 11.2.0 — DPAPI, libsecret, Android Keystore |
| Preferences | shared_preferences 2.5.6 |
| Files | path_provider 2.1.6 |
| Localization | flutter_localizations, intl 0.20.3 — en-US |
| Testing | flutter_test, integration_test, mocktail 1.0.5 |
| Analysis | flutter_lints 6.0.0 with `strict-casts` and `strict-raw-types` |
| Web container | `debian:13.7-slim` build → `nginxinc/nginx-unprivileged:1.31.7-alpine3.24`, pinned by digest |
| Packaging | `.deb` (Linux), Inno Setup (Windows), APK (Android), zip and container (web) |

The cryptography libraries are **not selected yet**: they are chosen during the protocol review
(webcrypto is the leading candidate) and then pinned.

## Cryptography

| Purpose | Construction |
| --- | --- |
| Content | AES-256-GCM |
| Password KDF | Argon2id v1.3 |
| Key derivation | HKDF-SHA-256 |
| Key wrapping | HPKE (RFC 9180), DHKEM(P-256) |
| Signatures | ECDSA P-256 / SHA-256 |
| Leases | ES256 JWS |

See [Security model](/docs/architecture/security-model/).

## Shared infrastructure

| Tool | Role |
| --- | --- |
| Forgejo | Canonical Git hosting (`git.techcraftsmen.net`); GitHub is a read-only mirror. |
| Jenkins + yggdrasil | CI checks and deployment, driven by each repository's `yggdrasil.yml`. |
| Renovate | Dependency updates, including image digests. |
