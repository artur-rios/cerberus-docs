+++
title = 'Collection sharing'
linkTitle = 'Sharing'
weight = 30
description = 'Sharing a collection read-only or read/write after fingerprint verification, changing or revoking the share, and using a shared collection.'
+++

Only **collections** are shared — never profiles, never a whole vault — and only with another
Cerberus account that already has vault protection. A share is a **grant**: read-only or
read/write, managed only by the collection's owner.

| A recipient with… | Can |
| --- | --- |
| **read-only** | Read the effective members of the collection. |
| **read/write** | Read and edit the existing effective members. No deletion, no membership changes, no sharing administration. |

## Sharing a collection

```mermaid
sequenceDiagram
    autonumber
    actor O as Owner
    participant C as Owner's client
    participant A as Cerberus API
    actor R as Recipient

    C->>A: look up the recipient's public key
    A-->>C: recipient key (JWK)
    Note over C: compute the RFC 7638 fingerprint
    alt first share with this recipient
        C->>O: show the fingerprint
        O->>R: compare it out of band (in person, a call)
        O->>C: confirm — the fingerprint is pinned
    else fingerprint changed since pinned
        C-->>O: sharing blocked until re-verified
    end
    O->>C: choose read-only or read/write
    Note over C: HPKE-wrap the collection root for the recipient,<br/>bound to grant id, revision, both fingerprints,<br/>signed with the author key
    C->>A: POST /api/collections/{id}/grants<br/>{grantId, recipientAccountId, expectedRevision: null,<br/>access, keyEnvelope}
    A-->>C: 201 collection_access_granted
```

{{% alert title="Not available yet" color="info" %}}
The API does not yet offer a lookup of a recipient's public key and fingerprint, nor a list of a
collection's grants; the client's sharing use cases (UC-30, UC-32, UC-33) wait on them. See
[Roadmap](/docs/reference/roadmap/#what-the-client-needs-from-the-api).
{{% /alert %}}

- Without the owner's confirmation nothing is shared.
- Self-grants are refused with `400`.
- Granting creates no profile association: the recipient decides which of **their own** profiles
  shows the collection (`PUT /api/profiles/{id}/associations`).

## Using a collection shared with me

The recipient's client fetches the recipient envelope, verifies its pinned fingerprints and the
author's signature **before** decapsulating, then decrypts the members locally. Shared content is
always marked as shared, and actions the grant does not allow are not offered — though the API
enforces them regardless.

## Changing or revoking a share

```mermaid
sequenceDiagram
    autonumber
    participant C as Owner's client
    participant A as Cerberus API
    participant RC as Recipient's client

    alt change access
        C->>A: PUT /api/collections/{id}/grants/{grantId}<br/>{expectedRevision, access, keyEnvelope}
    else revoke
        C->>A: DELETE /api/collections/{id}/grants/{grantId}<br/>{expectedRevision}
        Note over A: state Revoked, wrapper emptied
    end
    A->>A: recipient's revocation generation + 1
    A-->>C: ok
    RC->>A: next request with an old handle
    A-->>RC: 403 — handle stale
    Note over RC: re-unlock — on sync, the revoked<br/>collection's content is removed first
```

- Revoking rotates the collection's key epoch for future content and says plainly that **copies
  already made cannot be retracted**.
- A revoked grant is revived only by a new `POST` grant carrying the revoked revision as
  `expectedRevision`.
- Deleting the collection, or closing the owner's account, revokes every grant; restoring the
  collection from the trash does **not** revive them.
