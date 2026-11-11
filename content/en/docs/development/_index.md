+++
title = 'Development'
linkTitle = 'Development'
weight = 70
description = 'How Cerberus is built: the delivery workflow, the technology stack, testing and continuous integration.'
+++

Both repositories are **specified before they are built** and follow the same delivery model: one
use case is one issue, one branch and one pull request, carried through approval gates from design
to merge.

- [Workflow](workflow/) — branches, the issue lifecycle, approval gates, Definition of Done, releases.
- [Technology stack](technology-stack/) — every technology and version in both repositories.
- [Testing](testing/) — test layers, naming, doubles, the leak rule and the protocol vectors.
- [Continuous integration](continuous-integration/) — the Jenkins checks each repository runs.

## Specifications

Each repository keeps its specification documents under `docs/`. Start with `initial/` for context,
then `requirements/` for the normative detail.

| Document | Purpose |
| --- | --- |
| `initial/Brainstorm.md` | The original free-form notes, preserved. |
| `initial/Project Overview.md` | Scope, audience and success criteria. |
| `initial/Technology Stack.md` | The informal stack decisions. |
| `initial/Workflow.md` | How one use case is delivered, step by step. |
| `initial/Business Rules.md` | The numbered business rules. |
| `requirements/Vision Document.md` | Stakeholders, positioning and features. |
| `requirements/System Requirements Document.md` | Functional and non-functional requirements, data model, interfaces, traceability. |
| `requirements/Use Case Specification Document.md` | Every use case, its main flow and its `AF-xx` alternative flows. |
| `requirements/Development Workflow Document.md` | The normative branch pattern, gates and Definition of Done. |
| `requirements/Testing Specification Document.md` | How tests are written, named and run. |
| `requirements/Technology Stack Document.md` | The single source of truth for technologies and versions. |
| `requirements/Operations & Infrastructure Document.md` | Layout, configuration, CI, packaging and platform requirements. |

The API repository also keeps implementation contracts under `docs/security/` (one per API area,
plus the protocol review) and runbooks under `docs/operations/`.

## Contributing

The canonical repositories live on Forgejo at
[git.techcraftsmen.net/artur-rios](https://git.techcraftsmen.net/artur-rios); the GitHub copies are
read-only mirrors whose issues and pull requests are not followed. Each repository's
`CONTRIBUTING.md` explains how to build from source, run the tests and propose a change.
