+++
title = 'Glossary'
linkTitle = 'Glossary'
weight = 20
description = 'The terms used throughout the Cerberus documentation.'
+++

| Term | Meaning |
| --- | --- |
| **Account** | A user's Cerberus account. Distinct from the Heimdall identity it is linked to (exactly one). Its details are stored encrypted. |
| **Heimdall** | The external identity service. It handles sign-in, second factor, persons and application identities. |
| **Identity token** | The Heimdall bearer token. It proves *who* the caller is and opens nothing. |
| **Vault access** | A short-lived opaque handle (`X-Cerberus-Vault-Access`) issued after the client proves it holds the unlock key. Account-wide, or scoped to one profile. |
| **Challenge / proof** | A single-use, 60-second challenge the client signs with its unlock (or recovery) key to prove it holds the vault keys. |
| **Profile** | A view of the vault with its own selection of records, folders and collections, unlocked by the master password or its own password. Never shared directly. |
| **Record** | A named item made of typed fields — text, numeric, boolean or hidden text — optionally built from a template (password, login, note). Its name, fields and types live inside the ciphertext. |
| **Folder** | A container for records and other folders. Nested, without cycles. |
| **Collection** | An account-owned group of records and folders. It can be added to several profiles and shared. |
| **Grant** | Permission given to another account (a collection grant: read-only or read/write) or to software (a software grant: read-only). |
| **Envelope** | A ciphertext blob in a versioned format (`cerberus-content-v1`, `cerberus-recipient-wrap-v1`…) whose authenticated metadata binds owner, resource kind, resource id and key epoch. |
| **Wrapper** | Key material encrypted under something else: a password wrapper (Argon2id), a recovery wrapper (the recovery secret) or a recipient wrapper (HPKE). |
| **Key epoch** | A counter that versions keys. Rotating content or revoking a share moves to a new epoch. |
| **Fingerprint** | An RFC 7638 SHA-256 thumbprint of a public key, verified out of band before a first share. |
| **Recovery key** | A one-time recovery secret, shown once. It completes exactly one recovery and can be refreshed at any time. |
| **Protocol gate** | The client constant that keeps every encrypting flow disabled until the protocol review approves a version. |
| **Storage mode** | Per device: **default** (offline-capable; keeps ciphertext locally — Windows, Linux, Android) or **online-only** (persists nothing; always on the web). |
| **Offline lease** | An ES256-signed JWS that authorizes offline use until it expires. Renewed every 24 hours by default. |
| **Offline policy** | The account's renewal setting: enabled with an interval (default 24 h), or disabled. |
| **Cursor** | A client's position in its synchronization stream. |
| **Tombstone** | A terminal-erasure marker. It ensures a permanently deleted item is never resurrected — not by sync, not by a backup restore. |
| **Trash** | Where deleted records, folders, collections and profiles wait 30 days (720 hours) before permanent deletion. |
| **Closure** | A pending account deletion: access is revoked at once, with 30 days to cancel. |
| **Erasure ledger** | Files outside the database recording only the id, kind and time of completed erasures, replayed after a restore. |
| **Restore gate** | When set, the API refuses all traffic except health until restore reconciliation passes. |
