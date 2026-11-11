+++
title = 'Business rules'
linkTitle = 'Business rules'
weight = 20
description = 'The numbered rules of the Cerberus API and of the Cerberus UI.'
+++

Each repository numbers its own rules. Numbers are stable: a withdrawn rule keeps its number. The
API rules govern what the server enforces; the client rules govern what the application does on
the device. Where the two meet — encryption, trash, closure — they agree.

## API rules

{{< tabpane text=true >}}
{{% tab header="Identity and organization" %}}
| Rule | Statement |
| --- | --- |
| **BR-01** | Each user has their own Cerberus account, linked to exactly one Heimdall account. |
| **BR-02** | Identity authentication and authorization are delegated to Heimdall; resource ownership and collection grants are enforced by Cerberus. |
| **BR-03** | A vault profile is distinct from account details and belongs to one account. |
| **BR-04** | A record or folder may appear in several profiles of its owning account. |
| **BR-05** | A collection belongs to one account and may be associated with several profiles. |
| **BR-06** | Records and folders may belong to several collections. |
| **BR-07** | Folders nest; a cyclic parent relationship is rejected. |
| **BR-08** | Every record has a name; its other fields are user-defined, of the four field types. |
| **BR-09** | When a template is used, its mandatory fields are required; template-less records are allowed. |
{{% /tab %}}
{{% tab header="Encryption and access" %}}
| Rule | Statement |
| --- | --- |
| **BR-10** | End-to-end encryption: the API never holds plaintext or a usable decryption key. |
| **BR-11** | Communication between clients, Cerberus and Heimdall is encrypted. |
| **BR-12** | A master vault password, or distinct profile passwords; unlocking the vault is separate from signing in. |
| **BR-13** | A recovery credential completes exactly one server-mediated recovery; a replacement is issued after success. |
| **BR-14** | The recovery key can be refreshed at any time, which invalidates the previous one. |
| **BR-15** | Authenticated software gets only explicitly granted access, as ciphertext it decrypts locally. |
{{% /tab %}}
{{% tab header="Offline" %}}
| Rule | Statement |
| --- | --- |
| **BR-16** | Offline renewal defaults to 24 hours; the owner can change the interval or disable renewal. |
| **BR-17** | Known revocations are enforced on reconnection; with renewal enabled, offline use is blocked after expiry until renewal succeeds. |
| **BR-18** | Conflicting edits are resolved by the latest edit. |
| **BR-19** | Online-only clients persist no vault data; web clients use temporary memory only, with no persistent storage or caching. |
{{% /tab %}}
{{% tab header="Deletion and sharing" %}}
| Rule | Statement |
| --- | --- |
| **BR-20** | Deleted records, folders, collections and profiles go to the trash, restorable for 30 days, then permanently deleted. |
| **BR-21** | Owners can permanently delete a record immediately, or empty the trash at any time. |
| **BR-22** | Deleting a folder deletes the records in it, through nested folders too. |
| **BR-23** | Deleting a collection or a profile deletes it and its associations, but keeps the folders and records. |
| **BR-24** | Closing an account needs fresh authentication, revokes access immediately, and can be cancelled within 30 days, before permanent deletion. |
| **BR-25** | Immediate permanent account deletion is offered; it removes Cerberus data and grants, not the Heimdall identity. |
| **BR-26** | Completed deletions are reapplied when a backup is restored. |
| **BR-27** | Collections are shared with explicit read-only or read/write grants; only the owner manages sharing and deletes the collection. |
| **BR-28** | A grant exposes only the included content; no ownership transfer, no access to unrelated data. |
| **BR-29** | LGPD and GDPR are met through documented, verified controls. |
{{% /tab %}}
{{< /tabpane >}}

## Client rules

{{< tabpane text=true >}}
{{% tab header="Authority and keys" %}}
| Rule | Statement |
| --- | --- |
| **BR-01** | The API is the sole authority on ownership, grants, lifecycle and server-visible facts. |
| **BR-02** | Client validation is feedback only: always submit, and honour every refusal. |
| **BR-03** | An online change is not "saved" until the API confirms it; an offline change shows as "saved on this device, pending synchronization". |
| **BR-04** | The API's reason for a refusal is shown, unsoftened. |
| **BR-05** | Plaintext and usable keys never leave the device; requests carry only envelopes, wrapped keys, public keys and proofs. |
| **BR-06** | Only the reviewed protocol is used; dependent flows are blocked until the review passes. |
| **BR-07** | Every envelope's authenticated metadata is verified (owner, resource kind, resource id, key epoch); a mismatch is "tampered" and nothing is displayed. |
| **BR-08** | Fresh randomness; a nonce is never reused under the same key. |
| **BR-09** | Vault passwords and the recovery secret are never sent or stored. |
| **BR-10** | A recipient key is never trusted because the API supplied it: its fingerprint is verified out of band before the first share, and a changed fingerprint blocks sharing until re-verified. |
{{% /tab %}}
{{% tab header="Unlock and devices" %}}
| Rule | Statement |
| --- | --- |
| **BR-11** | Signing in never unlocks; unlocking is a separate, local step. |
| **BR-12** | Decrypted content exists only while displayed; hidden fields stay concealed until revealed. |
| **BR-13** | The vault locks on request, on inactivity, on sign-out and at session end; locking discards all keys and decrypted items. |
| **BR-14** | A copied value is cleared from the clipboard after the interval, unless the clipboard has changed since. |
| **BR-15** | Content is excluded from screenshots and the recent-apps preview where the platform allows. |
| **BR-16** | An open profile shows only its content; another profile needs its own unlock. |
| **BR-17** | A restricted device opens, stores and syncs only its profile; lifting the restriction needs fresh authentication. |
| **BR-18** | The default storage mode exists on Windows, Linux and Android only; its store holds only ciphertext, metadata, the protection bundle, the lease and pending edits. |
| **BR-19** | Online-only persists no vault data; switching to it deletes the store, after warning about pending edits. |
| **BR-20** | The web persists nothing and disables HTTP caching; reloading signs the user out. |
| **BR-21** | The storage mode is chosen per device and always visible. |
{{% /tab %}}
{{% tab header="Offline and sharing" %}}
| Rule | Statement |
| --- | --- |
| **BR-22** | A lease is used only after its signature verifies against a pinned key; an expired renewal-enabled lease locks the offline vault until renewal. |
| **BR-23** | A clock rollback never extends a lease: expiry is judged against the latest observed time. |
| **BR-24** | On reconnection, revocations, visibility removals and tombstones are applied before new content is shown. |
| **BR-25** | Offline edits are uploaded with client timestamps and operation ids; each outcome (applied, superseded, denied, permanently deleted) is shown, and a superseded edit is never silently discarded. |
| **BR-26** | A permanently deleted item is never resurrected; a tombstone removes its local copy and pending edits. |
| **BR-27** | Each action is offered only to an actor who may take it; shared content is always marked as shared. |
| **BR-28** | A hidden control is never the only protection. |
| **BR-29** | Revocation is presented honestly: it stops future access but cannot retract copies already made. |
| **BR-30** | Every record has a name; fields are text, numeric, boolean or hidden text; template-required fields are enforced. |
| **BR-31** | Search and sort happen on the device; no plaintext search term is sent to the API. |
{{% /tab %}}
{{% tab header="Lifecycle and privacy" %}}
| Rule | Statement |
| --- | --- |
| **BR-32** | Delete means trash, with a stated 30-day window; permanent deletion is separate, explicitly confirmed and stated as irreversible. |
| **BR-33** | Deleting a folder takes its nested folders and records; deleting a collection or profile keeps them — the UI says which. |
| **BR-34** | Closure needs fresh authentication; access is revoked immediately, with 30 days to cancel. Immediate deletion is separately confirmed and states that the Heimdall identity survives. |
| **BR-35** | A credential exists only for its submission: never stored, retained, logged or kept on a screen the user has left. |
| **BR-36** | The token lives only in platform secure storage (native) or in memory (web) — never in preferences, a URL or the local store. |
| **BR-37** | A token rejected mid-session ends the session and locks the vault; no silent refresh, no replay. |
| **BR-38** | Sign-out clears the token, locks the vault and drops in-memory state; in the default mode the store is kept unless the user removes it. |
| **BR-39** | A second-factor challenge grants nothing; the app is signed out until it completes. |
| **BR-40** | The recovery secret is shown once and the user confirms saving it; a refresh replaces it and the old one stops working. |
| **BR-41** | No data goes anywhere but the Cerberus API: no analytics, telemetry or crash reporting. |
| **BR-42** | No log carries secrets, plaintext or envelope bodies; release builds emit no log. |
| **BR-43** | Export and deletion are reachable in the UI without contacting anyone; a decrypted export is offered only after unlock, with its plaintext consequence stated and confirmed. |
{{% /tab %}}
{{< /tabpane >}}

## Validation constraints

| Input | Constraint |
| --- | --- |
| Record name | Required; no length or uniqueness limit. |
| Numeric field | A number only. |
| Templates | Password: the password. Login: username or email, and a password. Note: the note. |
| Vault password | Entered twice when set or changed; no strength rule beyond the protocol's. |
| Recovery secret | Accepted only in the exact encoding it was shown in. |
| Folders | No cycles. |
| Offline renewal interval | Positive, or disabled. |
| Auto-lock and clipboard intervals | Positive, or "never" (with a warning). |
| Instance address | Well-formed HTTPS; HTTP in debug builds only. |
