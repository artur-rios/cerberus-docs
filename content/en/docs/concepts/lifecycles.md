+++
title = 'Lifecycles'
linkTitle = 'Lifecycles'
weight = 30
description = 'The states that accounts, vault resources, grants, recovery keys and offline leases move through.'
+++

## Account

```mermaid
stateDiagram-v2
    [*] --> Active: register (UC-01)
    Active --> ClosurePending: request closure (UC-06)<br/>fresh authentication
    ClosurePending --> Active: cancel within 30 days (UC-07)
    ClosurePending --> Purged: deadline passes (UC-53)
    Active --> Purged: permanently delete now (UC-08)
    Purged --> [*]
    note right of ClosurePending
        All sessions, challenges, incoming and
        outgoing grants and software grants are
        revoked at once. Data is kept until the deadline.
    end note
    note right of Purged
        The row is gone; only terminal markers
        and the erasure ledger remain.
        The Heimdall identity survives.
    end note
```

Cancelling a closure makes the account **Active** again, but revoked sessions and grants are not
revived: the owner unlocks again and re-shares.

## Records, folders, collections and profiles

```mermaid
stateDiagram-v2
    [*] --> Active: create
    Active --> Active: update · move (expectedRevision)
    Active --> Trashed: delete
    Trashed --> Active: restore within 30 days
    Trashed --> Purged: 720 h pass · empty trash
    Active --> Purged: permanently delete (records)
    Purged --> [*]
```

What deleting takes with it differs by kind:

| Deleting a… | Goes to the trash | Kept |
| --- | --- | --- |
| **Record** | The record. | — |
| **Folder** | The folder, its nested folders and every record in them — one trash operation. | — |
| **Collection** | The collection and its associations. Its grants are **revoked**, and a restore does not revive them. | The member records and folders. |
| **Profile** | The profile and its associations. | The records, folders and collections. |

A restore revalidates links and reports what it could not restore. An entry that expires while
displayed is reported as permanently deleted, not as a failure.

## Collection grant

```mermaid
stateDiagram-v2
    [*] --> Active: grant (UC-35)<br/>read-only or read/write
    Active --> Active: change access (UC-36)<br/>recipient's handles go stale
    Active --> Revoked: revoke (UC-37)<br/>wrapper emptied
    Revoked --> Active: regrant (POST, expectedRevision = revoked revision)
    Active --> Revoked: collection deleted · account closed
```

## Software grant

```mermaid
stateDiagram-v2
    [*] --> Active: grant (UC-42)
    Active --> Revoked: revoke (UC-44) · account closed
```

## Recovery key

```mermaid
stateDiagram-v2
    [*] --> Current: initialize protection (UC-38)
    Current --> Consumed: recover (UC-40)
    Current --> Superseded: refresh (UC-41)
    Consumed --> [*]
    Superseded --> [*]
    note right of Consumed
        A recovery issues a new generation,
        which becomes Current.
    end note
```

A recovery credential completes **exactly one** recovery. A competing recovery with the same
credential gets `409 recovery_credential_consumed`; an exact retry gets the historical outcome.

## Vault access on the client

```mermaid
stateDiagram-v2
    direction LR
    [*] --> SignedOut
    SignedOut --> ChallengePending: second factor required
    ChallengePending --> SignedIn: code accepted
    SignedOut --> SignedIn: signed in
    state SignedIn {
        [*] --> Locked
        Locked --> Unlocked: password → proof → handle
        Unlocked --> Locked: lock · inactivity · lease expiry
    }
    SignedIn --> SignedOut: sign out · token rejected
```

## Offline lease

```mermaid
stateDiagram-v2
    [*] --> Valid: issued at unlock or after sync<br/>(signature verified, pinned key)
    Valid --> Valid: renewed online before expiry
    Valid --> Expired: exp passes<br/>(judged against latest observed time)
    Expired --> Valid: renewed online
    Valid --> NoExpiry: renewal disabled
    NoExpiry --> Valid: renewal re-enabled
    note right of Expired
        The offline vault is locked
        until renewal succeeds.
    end note
```
