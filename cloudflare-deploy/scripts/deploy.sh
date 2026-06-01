#!/usr/bin/env bash
# Despliega el Worker actual en Cloudflare usando wrangler
set -euo pipefail

ENV="${1:-}"

if [ ! -f "wrangler.toml" ] && [ ! -f "wrangler.json" ]; then
  echo "Error: no se encontró wrangler.toml. Ejecuta primero /cloudflare-deploy:setup" >&2
  exit 1
fi

if ! wrangler whoami &>/dev/null; then
  echo "Error: no hay sesión activa. Ejecuta 'wrangler login'" >&2
  exit 1
fi

if [ -n "$ENV" ]; then
  wrangler deploy --env "$ENV"
else
  wrangler deploy
fi
