#!/usr/bin/env bash

set -e

# Lint TypeScript
npx tsc --noEmit --pretty

# Bundle into JavaScript
npx esbuild \
  --bundle \
  --format=cjs \
  --outfile=text-utils.novaextension/Scripts/main.dist.js \
  src/Scripts/main.ts
