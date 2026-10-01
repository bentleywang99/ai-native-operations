#!/bin/bash
# indexnow.sh — tell Bing (and Yandex) that handbook pages changed.
# Mirrors site/ops/indexnow.sh, with its own key because IndexNow keys are per host and the
# handbook is on handbook.stacknative.ai (GitHub Pages), not stacknative.ai (Cloud Run).
# The key is served as <key>.txt at the handbook root, committed to this repo.
# Google does not take IndexNow; it finds us through the sitemap.
# Usage: bash ops/indexnow.sh [url ...]    (no args = every URL in the published sitemap)
set -euo pipefail
HB="$(cd "$(dirname "$0")/.." && pwd)"
KEY="$(cat "$HB/ops/.indexnow-key")"
HOST="handbook.stacknative.ai"
if [ $# -gt 0 ]; then URLS=("$@"); else
  URLS=($(curl -sf "https://$HOST/sitemap.xml" | python3 -c "
import re,sys; print('\n'.join(re.findall(r'<loc>([^<]+)</loc>', sys.stdin.read())))"))
fi
[ ${#URLS[@]} -gt 0 ] || { echo "no urls"; exit 1; }
BODY=$(python3 - "$KEY" "$HOST" "${URLS[@]}" <<'PY'
import json, sys
key, host, urls = sys.argv[1], sys.argv[2], sys.argv[3:]
print(json.dumps({"host": host, "key": key,
                  "keyLocation": f"https://{host}/{key}.txt", "urlList": urls}))
PY
)
echo "submitting ${#URLS[@]} urls for $HOST"
curl -s -o /tmp/indexnow-handbook.out -w "IndexNow: HTTP %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" -d "$BODY"
[ -s /tmp/indexnow-handbook.out ] && head -c 300 /tmp/indexnow-handbook.out && echo
exit 0
