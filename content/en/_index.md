+++
title = 'Cerberus'
linkTitle = 'Cerberus'
+++

{{< blocks/cover title="Cerberus" image_anchor="top" height="med" color="dark" >}}
<p class="lead mt-4">An end-to-end encrypted vault for credentials, passwords, notes and any other sensitive record.<br>
The server stores ciphertext; only your devices can read it.</p>
<a class="btn btn-lg btn-primary me-3 mb-4" href="docs/">
  Read the documentation <i class="fas fa-arrow-alt-circle-right ms-2"></i>
</a>
<a class="btn btn-lg btn-secondary me-3 mb-4" href="docs/reference/rest-api/">
  API reference <i class="fas fa-book ms-2"></i>
</a>
{{< /blocks/cover >}}

{{% blocks/lead color="primary" %}}
Cerberus is two applications: the **Cerberus API**, a .NET service that stores encrypted vault
content and enforces ownership, sharing and lifecycle without ever being able to decrypt it, and
the **Cerberus UI**, a Flutter client for the web, Windows, Linux and Android where the vault is
actually opened. Identity is delegated to **Heimdall**.
{{% /blocks/lead %}}

{{% blocks/section color="white" type="row" %}}

{{% blocks/feature icon="fa-lock" title="Zero-knowledge by design" url="docs/architecture/security-model/" %}}
Keys are derived and held on the client. Plaintext never leaves the device — not to the server,
a log, a preference or a screenshot.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-folder-tree" title="Organized vault" url="docs/concepts/domain-model/" %}}
Typed records, nested folders, collections and profiles — and a device can be restricted to a
single profile.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-share-nodes" title="Controlled sharing" url="docs/flows/sharing/" %}}
Share a collection read-only or read/write after verifying the recipient's key fingerprint, and
grant software read access to selected secrets.
{{% /blocks/feature %}}

{{% /blocks/section %}}

{{% blocks/section color="light" type="row" %}}

{{% blocks/feature icon="fa-plane" title="Works offline" url="docs/flows/offline-sync/" %}}
Desktop and Android keep only ciphertext, lock when the offline authorization expires, and
synchronize on reconnection with revocations applied first.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-trash-arrow-up" title="Recoverable deletion" url="docs/flows/deletion/" %}}
A 30-day trash, account closure with a 30-day change of mind, immediate purge and a full data
export.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-heart-pulse" title="Operable" url="docs/operations/" %}}
Explicit configuration with no production defaults, health probes, migrations on demand and a
documented restore runbook.
{{% /blocks/feature %}}

{{% /blocks/section %}}
