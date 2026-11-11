+++
title = 'Operations'
linkTitle = 'Operations'
weight = 60
description = 'Configuring, monitoring, backing up and restoring a Cerberus API instance.'
+++

Cerberus is built to be operated without ever touching a usable vault key. Operators configure the
instance explicitly, watch its health, keep its backups and erasure ledger, and restore it with a
reconciliation step that reapplies completed deletions.

- [Configuration](configuration/) — every setting, what is required and how it is validated.
- [Health](health/) — the liveness, readiness and detailed probes.
- [Backup and restore](backup-and-restore/) — backups, the erasure ledger and the restore runbook.

## Principles

- **No production defaults.** The API refuses to start without explicit database, Heimdall and
  operational settings. Backup and log retention have no unlimited default.
- **Fail closed.** An unavailable Heimdall answers `503 identity_unavailable`; a restored instance
  refuses traffic until reconciliation passes.
- **Nothing sensitive in logs.** Configuration failures print setting *names* only; the Heimdall
  client logs no request or response; failures log stable codes, never bodies or headers.
- **No caching.** Every response carries `Cache-Control: no-store`.
