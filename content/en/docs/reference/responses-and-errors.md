+++
title = 'Responses and errors'
linkTitle = 'Responses and errors'
weight = 20
description = 'The response envelope, request headers, HTTP status mapping and the stable error codes of the Cerberus API.'
+++

## Request headers

| Header | When | Value |
| --- | --- | --- |
| `Authorization` | Every protected request | `Bearer <Heimdall token>` — a person token, or an application token for `GET /api/software-secrets` only. |
| `X-Cerberus-Vault-Access` | Every request that reads or changes vault content | The base64url vault-access handle (32 opaque bytes) from `/api/vault/unlock` or `/api/profiles/{id}/access`. |
| `X-Cerberus-Challenge-Id` | Proof operations | The challenge id from `/api/vault/challenges` or `/api/profiles/{id}/access/challenges`. |
| `X-Cerberus-Proof` | Proof operations | The client's signature over the challenge and the exact request bytes. |
| `Content-Type` | Bodies | `application/json` — proof bodies must be uncompressed strict UTF-8 without a BOM. |

## Response envelope

Every response, success or failure, is wrapped:

```json
{
  "success": true,
  "data": { "id": "6f1c…", "revision": 3 },
  "messages": ["record_found"],
  "errors": [],
  "timestamp": "2026-11-10T12:00:00Z"
}
```

| Field | Meaning |
| --- | --- |
| `success` | Whether the operation succeeded (read-only). |
| `data` | The result, for operations that return one (`DataOutput<T>`); absent for `ProcessOutput`. |
| `messages` | Stable outcome codes, e.g. `collection_access_granted`, `software_secret_found`. |
| `errors` | Stable error codes — see below. |
| `timestamp` | Server time of the response. |

The one exception is the account export, which streams a raw JSON attachment
(`cerberus-account-export.json`, format `cerberus-account-export-v1`).

Every response carries `Cache-Control: no-store`.

## Status codes

| Status | Meaning |
| --- | --- |
| `200` / `201` / `202` | Success; `202` for work that completes asynchronously (e.g. account erasure `pending`). |
| `400` | Invalid input (`validation_failed`). |
| `401` | Authentication or proof failed. |
| `403` | Denied — including a stale vault-access handle. |
| `404` | Absent **or hidden**: the API does not reveal whether a resource you may not see exists. |
| `409` | A revision or state conflict. |
| `410` | Expired — a trash restore after the deadline, a closure cancellation after 30 days. |
| `413` | The request exceeds `CERBERUS_MAX_REQUEST_BYTES` (empty body). |
| `503` | A dependency is unavailable (Heimdall, the database, restore reconciliation). |

## Error codes

| Code | Typical status | Meaning |
| --- | --- | --- |
| `validation_failed` | 400 | The input failed validation. |
| `authentication_required` | 401 | No valid identity token. Clients end the session. |
| `fresh_authentication_required` | 401 | The operation needs a token signed less than 60 seconds ago. |
| `vault_access_required` | 401 | Signed in, but no valid vault-access handle. Clients route to unlock. |
| `vault_access_denied` | 401 / 403 | The proof or handle was refused. |
| `operational_access_required` | 403 | `/health/details` without an operational grant. |
| `not_found` | 404 | Absent or not visible to the caller. |
| `revision_conflict` | 409 | `expectedRevision` does not match. |
| `operation_conflict` | 409 | An idempotency key or operation id was reused with a different payload. |
| `recovery_credential_consumed` | 409 | The recovery credential has already been used. |
| `resynchronization_required` | 409 | The sync cursor is invalid or expired: clear the scope and take a fresh snapshot. |
| `closure_expired` | 410 | The 30-day closure window has passed. |
| `identity_unavailable` | 503 | Heimdall could not be reached or answered unexpectedly; the API fails closed. |
| `persistence_unavailable` | 503 | The database is unavailable. |
| `restore_reconciliation_required` | 503 | The instance was restored and has not reconciled yet. |

## Concurrency

Online writes carry `expectedRevision` (or `expectedAccountRevision`, `expectedProtectionRevision`,
`expectedPolicyRevision`) and fail with `409 revision_conflict` when it is stale. Offline edits are
the exception: they carry no expected revision and are resolved by the latest edit — see
[Offline use and synchronization](/docs/flows/offline-sync/#upload-and-latest-edit-wins).
