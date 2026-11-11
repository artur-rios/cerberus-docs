#!/usr/bin/env node
// Runs Hugo with the native Dart Sass compiler from `sass-embedded` first on PATH.
//
// Hugo compiles Docsy's SCSS by executing a `sass` binary that speaks the embedded protocol. The
// `node_modules/.bin/sass` shim npm creates can resolve to the pure-JavaScript `sass` package,
// which does not, so Hugo fails with "unexpected EOF when executing sass". The platform package
// of `sass-embedded` ships the real compiler; this wrapper puts its directory on PATH and passes
// every argument through to Hugo, e.g. `node scripts/hugo.mjs server`.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const env = { ...process.env };
const pathKey = Object.keys(env).find((k) => k.toUpperCase() === 'PATH') ?? 'PATH';

try {
  const pkg = require.resolve(`sass-embedded-${process.platform}-${process.arch}/package.json`);
  env[pathKey] = [path.join(path.dirname(pkg), 'dart-sass'), env[pathKey]].join(path.delimiter);
} catch {
  console.warn('sass-embedded has no native compiler for this platform; using the sass on PATH.');
}

const hugo = spawn('hugo', process.argv.slice(2), {
  env,
  stdio: 'inherit',
});
hugo.on('exit', (code) => process.exit(code ?? 1));
