#!/usr/bin/env bash

set -e

# Install npm dependencies
npm install --no-audit --no-fund

# Lint TypeScript
npx tsc --noEmit --pretty

# Bundle into JavaScript
npx esbuild \
  --bundle \
  --format=cjs \
  --outfile=Doofer.novaextension/Scripts/main.dist.js \
  src/Scripts/main.ts
