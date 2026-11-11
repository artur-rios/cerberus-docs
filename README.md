# Cerberus documentation

The documentation site for **Cerberus**, an end-to-end encrypted vault: the
[Cerberus API](https://git.techcraftsmen.net/artur-rios/cerberus-api) (.NET 10) and the
[Cerberus UI](https://git.techcraftsmen.net/artur-rios/cerberus-ui) (Flutter).

It is a [Hugo](https://gohugo.io/) site using the [Docsy](https://www.docsy.dev/) theme, written in
Markdown with [Mermaid](https://mermaid.js.org/) diagrams.

## Prerequisites

- **Hugo extended** 0.160.1 or later.
- **Node.js** 24 or later and npm.
- **Git**, for the theme submodule.

## Set up

```bash
git clone --recurse-submodules <this repository>
cd cerberus-docs
npm install
```

`npm install` restores the Docsy submodule at its recorded revision (`themes/docsy`, pinned to
`v0.18.1`), installs the theme's runtime dependencies, and installs `sass-embedded`, the Dart Sass
compiler Docsy needs.

## Run and build

```bash
npm run serve
```

```bash
npm run build
```

`npm run serve` serves the site at <http://localhost:1313/> with live reload; `npm run build`
writes the static site to `public/`. Both go through `scripts/hugo.mjs`, which puts the native Dart
Sass compiler from `sass-embedded` on `PATH` before running Hugo; any Hugo command works through
`npm run hugo -- <args>`.

## Layout

| Path | Contents |
| --- | --- |
| `hugo.toml` | Site configuration. |
| `content/en/_index.md` | The landing page. |
| `content/en/docs/` | The documentation, one folder per section; the sidebar order comes from each page's `weight`. |
| `static/openapi/cerberus-api.json` | A copy of the API's OpenAPI contract, rendered on the REST API page. |
| `themes/docsy/` | The Docsy theme (git submodule). |
| `scripts/hugo.mjs` | The Hugo wrapper. |

## Updating the API contract

The REST API page renders `static/openapi/cerberus-api.json`. Refresh it from the API repository
when the contract changes:

```bash
cp ../cerberus-api/docs/contracts/openapi.json static/openapi/cerberus-api.json
```

## Deploying

Set `baseURL` in `hugo.toml` to the site's address, run `npm run build`, and serve `public/` with
any static web server.

## License

Copyright (c) 2026 Artur Rios. The Docsy theme is licensed under Apache 2.0.
