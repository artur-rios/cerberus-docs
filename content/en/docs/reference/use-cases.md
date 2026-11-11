+++
title = 'Use cases'
linkTitle = 'Use cases'
weight = 30
description = 'Every use case of the Cerberus API and of the Cerberus UI, by milestone.'
+++

Each repository numbers its own use cases. The full main and alternative flows are in each
repository's `docs/requirements/Use Case Specification Document.md`.

**Legend:** ✅ done · ⬜ not started

## API — 55 use cases

{{< tabpane text=true >}}
{{% tab header="M-02 Identity and protection" %}}
| Use case | Endpoint | Status |
| --- | --- | --- |
| UC-01 — Register account | `POST /api/accounts` | ✅ |
| UC-02 — Authenticate | `POST /api/auth/login`, `POST /api/auth/2fa/verify` | ✅ |
| UC-03 — Get account | `GET /api/accounts/me` | ✅ |
| UC-04 — Update account | `PUT /api/accounts/me` | ✅ |
| UC-05 — Update identity details | `PUT /api/identity/me` | ✅ |
| UC-38 — Initialize vault protection | `POST /api/vault/protection` | ✅ |
| UC-39 — Change vault protection | `PUT /api/vault/protection` | ✅ |
| UC-40 — Recover vault access | `POST /api/vault/recovery` | ✅ |
| UC-41 — Refresh recovery key | `PUT /api/vault/recovery` | ✅ |
{{% /tab %}}
{{% tab header="M-03 Organized vault" %}}
| Use case | Endpoint | Status |
| --- | --- | --- |
| UC-09 — Create profile | `POST /api/profiles` | ✅ |
| UC-10 — List profiles | `GET /api/profiles` | ✅ |
| UC-11 — Get profile | `GET /api/profiles/{id}` | ✅ |
| UC-12 — Update profile | `PUT /api/profiles/{id}` | ✅ |
| UC-13 — Delete profile | `DELETE /api/profiles/{id}` | ✅ |
| UC-14 — Set profile associations | `PUT /api/profiles/{id}/associations` | ✅ |
| UC-15 — Open profile access | `POST /api/profiles/{id}/access` | ✅ |
| UC-16 — Create record | `POST /api/records` | ✅ |
| UC-17 — List records | `GET /api/records` | ✅ |
| UC-18 — Get record | `GET /api/records/{id}` | ✅ |
| UC-19 — Update record | `PUT /api/records/{id}` | ✅ |
| UC-20 — Delete record | `DELETE /api/records/{id}` | ✅ |
| UC-21 — Move record | `PUT /api/records/{id}/folder` | ✅ |
| UC-22 — Permanently delete record | `DELETE /api/records/{id}/permanent` | ✅ |
| UC-23 — Create folder | `POST /api/folders` | ✅ |
| UC-24 — List folders | `GET /api/folders` | ✅ |
| UC-25 — Get folder | `GET /api/folders/{id}` | ✅ |
| UC-26 — Update folder | `PUT /api/folders/{id}` | ✅ |
| UC-27 — Delete folder | `DELETE /api/folders/{id}` | ✅ |
| UC-28 — Move folder | `PUT /api/folders/{id}/parent` | ✅ |
| UC-29 — Create collection | `POST /api/collections` | ✅ |
| UC-30 — List collections | `GET /api/collections` | ✅ |
| UC-31 — Get collection | `GET /api/collections/{id}` | ✅ |
| UC-32 — Update collection | `PUT /api/collections/{id}` | ✅ |
| UC-33 — Delete collection | `DELETE /api/collections/{id}` | ✅ |
| UC-34 — Set collection membership | `PUT /api/collections/{id}/members` | ✅ |
{{% /tab %}}
{{% tab header="M-04 Sharing and software" %}}
| Use case | Endpoint | Status |
| --- | --- | --- |
| UC-35 — Grant collection access | `POST /api/collections/{id}/grants` | ✅ |
| UC-36 — Change collection access | `PUT /api/collections/{id}/grants/{grantId}` | ✅ |
| UC-37 — Revoke collection access | `DELETE /api/collections/{id}/grants/{grantId}` | ✅ |
| UC-42 — Grant software access | `POST /api/software-grants` | ✅ |
| UC-43 — Retrieve software secrets | `GET /api/software-secrets` | ✅ |
| UC-44 — Revoke software access | `DELETE /api/software-grants/{id}` | ✅ |
{{% /tab %}}
{{% tab header="M-05 Offline sync" %}}
| Use case | Endpoint | Status |
| --- | --- | --- |
| UC-45 — Get offline policy | `GET /api/accounts/me/offline-policy` | ✅ |
| UC-46 — Set offline policy | `PUT /api/accounts/me/offline-policy` | ✅ |
| UC-47 — Renew offline authorization | `POST /api/offline-authorizations` | ✅ |
| UC-48 — Download synchronization changes | `GET /api/sync/changes` | ✅ |
| UC-49 — Upload offline edits | `POST /api/sync/edits` | ✅ |
{{% /tab %}}
{{% tab header="M-06 Deletion and operations" %}}
| Use case | Endpoint | Status |
| --- | --- | --- |
| UC-06 — Request account closure | `POST /api/accounts/me/closure` | ✅ |
| UC-07 — Cancel account closure | `POST /api/auth/closure/login`, `POST /api/accounts/me/closure/cancel` | ✅ |
| UC-08 — Permanently delete account | `DELETE /api/accounts/me/permanent` | ✅ |
| UC-50 — List trash | `GET /api/trash` | ✅ |
| UC-51 — Restore trash entry | `POST /api/trash/{id}/restore` | ✅ |
| UC-52 — Empty trash | `DELETE /api/trash` | ✅ |
| UC-53 — Expire retained deletions | Retention worker | ✅ |
| UC-54 — Export account data | `POST /api/accounts/me/export` | ✅ |
| UC-55 — Check API health | `GET /health/live`, `/health/ready`, `/health/details` | ✅ |
{{% /tab %}}
{{< /tabpane >}}

## Client — 48 use cases

Use cases marked 🔒 wait on the protocol review (the [protocol gate](/docs/architecture/client/#the-crypto-boundary-and-the-protocol-gate)).

{{< tabpane text=true >}}
{{% tab header="M-02 Access and session" %}}
| Use case | Status |
| --- | --- |
| UC-01 — Configure the instance | ⬜ |
| UC-02 — Register an account | ⬜ |
| UC-03 — Sign in | ✅ |
| UC-04 — Complete a second-factor challenge | ✅ |
| UC-05 — Restore a session at start | ✅ |
| UC-06 — Sign out | ✅ |
| UC-07 — Guard a route | ✅ |
| UC-09 — Update identity details | ⬜ |
| UC-10 — Choose preferences | ✅ |
{{% /tab %}}
{{% tab header="M-03 Vault protection" %}}
| Use case | Status |
| --- | --- |
| UC-08 — View and update account details 🔒 | ⬜ |
| UC-11 — Encrypt and decrypt vault content 🔒 | ⬜ |
| UC-12 — Initialize vault protection 🔒 | ⬜ |
| UC-13 — Unlock the vault 🔒 | ⬜ |
| UC-14 — Lock the vault 🔒 | ⬜ |
| UC-15 — Change vault protection 🔒 | ⬜ |
| UC-16 — Recover vault access 🔒 | ⬜ |
| UC-17 — Refresh the recovery key 🔒 | ⬜ |
{{% /tab %}}
{{% tab header="M-04 Organized vault" %}}
| Use case | Status |
| --- | --- |
| UC-18 — Manage profiles 🔒 | ⬜ |
| UC-19 — Restrict a device to a profile 🔒 | ⬜ |
| UC-20 — Set a profile's contents 🔒 | ⬜ |
| UC-21 — Create a record 🔒 | ⬜ |
| UC-22 — Browse and search the vault 🔒 | ⬜ |
| UC-23 — Open a record and reveal its fields 🔒 | ⬜ |
| UC-24 — Edit a record 🔒 | ⬜ |
| UC-25 — Move a record 🔒 | ⬜ |
| UC-26 — Delete a record 🔒 | ⬜ |
| UC-27 — Manage folders 🔒 | ⬜ |
| UC-28 — Move a folder 🔒 | ⬜ |
| UC-29 — Delete a folder 🔒 | ⬜ |
| UC-30 — Manage collections 🔒 | ⬜ |
| UC-31 — Set a collection's members 🔒 | ⬜ |
{{% /tab %}}
{{% tab header="M-05 Sharing and software" %}}
| Use case | Status |
| --- | --- |
| UC-32 — Share a collection 🔒 | ⬜ |
| UC-33 — Change or revoke a collection share 🔒 | ⬜ |
| UC-34 — Use a collection shared with me 🔒 | ⬜ |
| UC-35 — Grant software access 🔒 | ⬜ |
| UC-36 — Review and revoke software access 🔒 | ⬜ |
{{% /tab %}}
{{% tab header="M-06 Offline and sync" %}}
| Use case | Status |
| --- | --- |
| UC-37 — Choose the device storage mode | ⬜ |
| UC-38 — Set the offline policy | ⬜ |
| UC-39 — Renew offline authorization 🔒 | ⬜ |
| UC-40 — Synchronize changes 🔒 | ⬜ |
| UC-41 — Use the vault offline 🔒 | ⬜ |
| UC-42 — Upload offline edits 🔒 | ⬜ |
{{% /tab %}}
{{% tab header="M-07 Deletion and data rights" %}}
| Use case | Status |
| --- | --- |
| UC-43 — Browse and restore the trash 🔒 | ⬜ |
| UC-44 — Empty the trash | ⬜ |
| UC-45 — Close the account | ⬜ |
| UC-46 — Cancel account closure | ⬜ |
| UC-47 — Permanently delete the account | ⬜ |
| UC-48 — Export account data (🔒 for the decrypted export) | ⬜ |
{{% /tab %}}
{{< /tabpane >}}
