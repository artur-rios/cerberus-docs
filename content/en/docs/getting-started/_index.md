+++
title = 'Getting started'
linkTitle = 'Getting started'
weight = 20
description = 'Run the Cerberus API and the Cerberus UI on your own machine.'
+++

A working Cerberus needs three things running:

```mermaid
flowchart LR
    UI["Cerberus UI<br/>flutter run / container :8080"] -- "CERBERUS_API_BASE_URL" --> API["Cerberus API<br/>dotnet run / container :8080"]
    API -- "CERBERUS_HEIMDALL_BASE_URL" --> H[("Heimdall")]
    API -- "CERBERUS_DATA_CONNECTIONSTRING" --> DB[("PostgreSQL")]
```

1. **A Heimdall instance** with a scope for Cerberus and a scope-owner service credential.
2. **PostgreSQL** and the **Cerberus API** — see [Run the API](run-the-api/).
3. **The Cerberus UI**, pointed at the API — see [Run the client](run-the-client/).

{{% alert title="Development artifacts" color="warning" %}}
No release has been made. The API container is a development artifact, not a release-ready vault
API, and the protocol review is required before production use.
{{% /alert %}}
