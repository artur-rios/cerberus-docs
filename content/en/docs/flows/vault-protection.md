+++
title = 'Vault protection and recovery'
linkTitle = 'Vault protection'
weight = 20
description = 'Initializing protection, changing passwords or rotating content keys, recovering with the one-time key, and refreshing it.'
+++

## Initializing protection

After the first sign-in the account has no protection, and the client routes to `/vault/setup`.

```mermaid
sequenceDiagram
    autonumber
    actor U as Owner
    participant C as Cerberus UI
    participant A as Cerberus API

    U->>C: choose master password (twice) or per-profile passwords
    Note over C: generate key pairs and roots,<br/>Argon2id(password) → password wrapper,<br/>random recovery secret → recovery wrapper
    C->>U: show the recovery secret once
    U->>C: confirm it is saved
    C->>A: POST /api/vault/protection<br/>{accountId, expectedAccountRevision, material}
    A-->>C: 201 — revision, epochs and generation set to 1
```

`material` is exactly the opaque `passwordWrapper` and `recoveryWrapper` plus the public
`unlockVerifier`, `recoveryVerifier`, `recipientKey` and `authorKey` — four distinct P-256 JWKs.
Initializing needs no vault session; the protection material can be read back with
`GET /api/vault/protection` for local decryption.

## Changing protection

`PUT /api/vault/protection` changes protection in one of two modes:

| Mode | What changes | Content |
| --- | --- | --- |
| `rewrap` | New password wrapper(s), fresh salts and nonces, protection-slot epoch + 1. | Untouched — the inner roots are kept. |
| `rotate-content` | Everything in `rewrap`, plus new roots. | The account and **every** owned profile, record, folder and collection (trash included) are re-encrypted at content epoch + 1, and every active outgoing grant is re-wrapped. |

```mermaid
sequenceDiagram
    autonumber
    participant C as Cerberus UI (unlocked, account-wide)
    participant A as Cerberus API
    C->>A: POST /api/vault/challenges (change-protection)
    A-->>C: challenge bound to the request hash
    Note over C: build the full request body,<br/>sign it with the OLD unlock key
    C->>A: PUT /api/vault/protection + proof<br/>{expectedProtectionRevision, expectedAccountRevision,<br/>mode, material, contentReplacements, grantReplacements}
    A->>A: verify, replace atomically,<br/>revocation generation + 1
    A-->>C: new revisions
    Note over A,C: every existing vault-access handle is now stale
```

Changing protection never revokes keys a client has already copied.

## Recovering access

When the password is lost, the one-time recovery secret replaces it.

```mermaid
sequenceDiagram
    autonumber
    actor U as Owner
    participant C as Cerberus UI
    participant A as Cerberus API

    Note over C: freshly signed in, vault locked
    C->>A: GET /api/vault/recovery-material
    A-->>C: recovery wrapper + verifiers
    U->>C: recovery secret (exact encoding it was shown in)
    Note over C: decrypt the bundle with the secret,<br/>choose a new password, make new wrappers<br/>and a NEW recovery secret
    C->>A: POST /api/vault/challenges (recover)
    A-->>C: challenge
    C->>A: POST /api/vault/recovery + proof (old recovery key)<br/>{operation: "recover", idempotencyKey, expectedRevision,<br/>passwordWrapper, recoveryWrapper, newRecoveryVerifier}
    A->>A: one transaction: consume the old credential,<br/>replace wrappers and verifier, bump counters
    A-->>C: {status: "committed", protectionRevision, generation, revocationGeneration}
    C->>U: show the new recovery secret once
```

- The old recovery credential is **consumed**: a competing request gets
  `409 recovery_credential_consumed`; an exact retry of the same request returns the historical
  outcome.
- The server only ever sees the public recovery verifier; there is no endpoint that returns
  recovery plaintext.

## Refreshing the recovery key

At any time, while unlocked account-wide, the owner can replace the recovery secret:
`PUT /api/vault/recovery` (operation `refresh-recovery`), proven with the current unlock key. The
previous generation becomes **superseded** and stops working at once.

## Recovery key states

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Current
    Current --> Consumed: recover
    Current --> Superseded: refresh
```
