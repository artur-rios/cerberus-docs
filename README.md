# cerberus-docs

The documentation portal for [Cerberus](https://github.com/artur-rios/cerberus-api), an end-to-end
encrypted vault for credentials, passwords, notes and any other sensitive record: a .NET API that
stores only ciphertext, and the Flutter client where the vault is actually opened. This site explains
what Cerberus is, how it is put together, its security model, how each flow works, how to run and
operate it, and what its API offers. The REST API page renders a copy of cerberus-api's OpenAPI
contract.

**[docs.artur-rios.tech/cerberus-docs](https://docs.artur-rios.tech/cerberus-docs/)**

This repository contains documentation only. It builds no software and ships no package.

## The project

| Repository | What it holds |
|---|---|
| [cerberus-api](https://github.com/artur-rios/cerberus-api) | The .NET API: encrypted storage, ownership, sharing, synchronization and retention. |
| [cerberus-ui](https://github.com/artur-rios/cerberus-ui) | The Flutter client for web, Windows, Linux and Android. |
| [cerberus-docs](https://github.com/artur-rios/cerberus-docs) | This site. |

## Running it locally

**Requirements:** [Hugo extended](https://gohugo.io/installation/) 0.158 or newer — the
configuration uses `locale` and `languages.*.label`, which arrived in that release; the site image
builds with 0.165.0 — the [Go toolchain](https://go.dev/dl/) — Docsy is consumed as a Hugo Module —
and Node with npm, for Docsy's PostCSS pipeline. Python 3.11 or newer is needed only for the checks
below (the checker imports `tomllib`).

```bash
git clone https://git.techcraftsmen.net/artur-rios/cerberus-docs.git
cd cerberus-docs
npm ci
hugo server
```

The site is then at <http://localhost:1313/cerberus-docs/>.

To reproduce what the image builds:

```bash
hugo --minify
```

## Writing pages

- Diagrams are [Mermaid](https://mermaid.js.org/) code blocks. In a sequence diagram a `;` ends the
  statement, so keep semicolons out of messages and notes.
- Link between pages by their path from the site's root (`/docs/flows/sharing/`). The link render
  hook (`layouts/_markup/render-link.html`) resolves it against the site's address, so it works
  under `/cerberus-docs/` in production and in `hugo server`.
- The REST API page renders `static/openapi/cerberus-api.json`, a copy of cerberus-api's
  `docs/contracts/openapi.json`. Refresh it when the contract changes:

  ```bash
  cp ../cerberus-api/docs/contracts/openapi.json static/openapi/cerberus-api.json
  ```

## Checking it

Jenkins' `build` check builds the site image on every pull request, and the image builds the site and
then checks it, so a site that fails the check fails the pull request and is never deployed. The
check is that required pages exist, internal links and anchors resolve, Hugo printed no unexpected
warnings, and no placeholder text is left. To run the same check locally:

```bash
hugo --minify 2>&1 | tee hugo.log && python scripts/check_site.py --public public --build-log hugo.log
```

The pages that must exist are listed in `scripts/required_pages.txt`. The checker has its own tests:

```bash
python -m unittest discover -s scripts -p "test_*.py"
```

## Layout

```txt
cerberus-docs/
├── hugo.toml                 # site configuration
├── go.mod                    # the Docsy theme, as a Hugo Module
├── package.json              # autoprefixer + postcss-cli
├── assets/scss/
│   └── _styles_project.scss  # light/dark code-block styles, diagrams, tables
├── content/en/
│   ├── _index.md             # landing page
│   └── docs/                 # the documentation
├── layouts/_markup/
│   └── render-link.html      # resolves root-relative links against the site's address
├── static/openapi/           # the copy of cerberus-api's OpenAPI contract
├── i18n/en.toml              # footer text
├── scripts/
│   ├── check_site.py         # post-build site checker
│   ├── test_check_site.py    # tests for the checker
│   └── required_pages.txt    # pages that must be built
├── LICENSE
├── .wakatime-project         # editor time-tracking project name
├── ci/build.sh               # the pull request check: builds the image
├── yggdrasil.yml             # what Jenkins checks
├── Dockerfile                # builds, checks and serves the site
├── .dockerignore
├── renovate.json             # dependency updates
└── .gitattributes
```

Content lives under `content/en/` so a translation can be added alongside it without restructuring.

## Updating the theme

`go.mod` pins Docsy to v0.15.0 on purpose, as in the other docs sites. v0.16.0 moved the actual theme
(`layouts/`, `assets/`) into a git submodule that Go's module zip does not include, so it resolves as
a Hugo Module but builds no output.

Bumping the version therefore needs a real check, not just a green `go get`:

```bash
hugo mod get -u github.com/google/docsy
hugo --minify
```

Only commit the resulting `go.mod` and `go.sum` once that build has actually produced
`public/index.html` — an empty or missing `public/` means the new version is broken the same way
v0.16.0 was, and the pin should stay.

## Deployment

The site is deployed by Jenkins, from the yggdrasil pipeline: every push to `main` builds the
`Dockerfile` and deploys the image to production, where it is served at
<https://docs.artur-rios.tech/cerberus-docs/>. The image answers `/healthz` for the status check. The
address comes from the build arguments `PUBLIC_HOST` and `PUBLIC_PATH`, which the deploy passes, so
the `baseURL` in `hugo.toml` only matters for `hugo server`.

Every pull request is checked by Jenkins' `build` check (`yggdrasil.yml`, run by `ci/build.sh`),
which builds the same image without pushing or running it, and the site check above runs inside that
build.

To build the image locally:

```bash
docker build -t cerberus-docs \
  --build-arg PUBLIC_HOST=docs.artur-rios.tech --build-arg PUBLIC_PATH=/cerberus-docs .
docker run --rm -p 8080:8080 cerberus-docs
```

The site is then at <http://localhost:8080/cerberus-docs/>.

## Contributing

The GitHub repository is a read-only mirror for the real, open-source code of cerberus-docs. Its home
is Forgejo, at https://git.techcraftsmen.net/artur-rios/cerberus-docs. If you want to contribute,
e-mail me at arturdev@duck.com.
