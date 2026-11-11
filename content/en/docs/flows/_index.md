+++
title = 'Flows'
linkTitle = 'Flows'
weight = 50
description = 'Step by step, how the client and the API carry out each part of the product.'
+++

Each page follows one area end to end — what the user does, what the client computes on the
device, what crosses the wire and what the API checks.

| Flow | Covers | API use cases | Client use cases |
| --- | --- | --- | --- |
| [Authentication and vault access](authentication/) | Registration, sign-in, second factor, session restore, sign-out, unlock | UC-01, UC-02, UC-15 | UC-01 … UC-07, UC-13, UC-14 |
| [Vault protection and recovery](vault-protection/) | Initializing, changing and recovering protection; refreshing the recovery key | UC-38 … UC-41 | UC-12, UC-15 … UC-17 |
| [Collection sharing](sharing/) | Sharing a collection, changing and revoking a share, using a shared collection | UC-35 … UC-37 | UC-32 … UC-34 |
| [Software access](software-access/) | Granting software access to secrets, retrieving and revoking | UC-42 … UC-44 | UC-35, UC-36 |
| [Offline use and synchronization](offline-sync/) | Storage modes, offline policy, leases, sync download and upload | UC-45 … UC-49 | UC-37 … UC-42 |
| [Deletion, closure and export](deletion/) | Trash, retention, account closure and deletion, data export | UC-06 … UC-08, UC-50 … UC-54 | UC-43 … UC-48 |

API and client use cases are numbered independently in each repository; see
[Use cases](/docs/reference/use-cases/).
