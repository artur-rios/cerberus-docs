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

**Requirements:** [Hugo extended](https://gohugo.io/installation/) 0.160.1 or newer — the minimum of Docsy v0.18.1; the site image
builds with 0.165.0 — the [Go toolchain](https://go.dev/dl/) — Docsy is consumed as a Hugo Module —
and Node with npm, for the theme's Bootstrap and Font Awesome and for Dart Sass. Python 3.11 or newer is needed only for the checks
below (the checker imports `tomllib`).

```bash
git clone https://git.techcraftsmen.net/artur-rios/cerberus-docs.git
cd cerberus-docs
npm ci
export PATH="$PWD/node_modules/.bin:$PATH"
hugo server
```

Hugo runs Dart Sass, which Docsy compiles its SCSS with, as `sass` from the
`PATH`; `npm ci` installs it as the `sass-embedded` package, hence the `export`.
On Windows, npm also installs the pure-JavaScript `sass` package, whose `sass`
command shadows the embedded one and cannot serve Hugo: put
`node_modules/sass-embedded-win32-x64/dart-sass` on the `PATH` instead, or
[install Dart Sass](https://gohugo.io/functions/css/sass/#dart-sass).

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
├── package.json              # Dart Sass (sass-embedded), autoprefixer, postcss-cli
├── package-lock.json
├── packages/hugoautogen/      # the theme's npm packages (`hugo mod npm pack`)
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

Docsy is the Hugo Module `github.com/docsy/docsy/theme`, at the version in
`go.mod`. Since v0.16.0 the theme declares Bootstrap and Font Awesome as npm
packages, which `hugo mod npm pack` writes into the `packages/hugoautogen`
workspace of `package.json`. Moving the theme is therefore four commands, not
one, or the stylesheets are built against the previous theme's Bootstrap:

```bash
hugo mod get github.com/docsy/docsy/theme@<version>
hugo mod npm pack
npm install
hugo --minify
```

Commit `go.mod`, `go.sum`, `package.json`, `package-lock.json` and
`packages/` once that build has produced `public/index.html` without a
warning. Run `hugo mod npm pack` again after any change to `package.json`
too: Hugo warns that the npm dependencies are out of sync until it has.

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
