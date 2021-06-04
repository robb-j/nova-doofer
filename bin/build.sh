#!/usr/bin/env bash

set -e

# npx tsc --noEmit --pretty

npx esbuild \
  --bundle \
  --format=cjs \
  --outfile=text-utils.novaextension/Scripts/main.dist.js \
  src/Scripts/main.ts
