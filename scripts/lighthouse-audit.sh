#!/usr/bin/env bash
set -euo pipefail

TARGET_URL="${1:-https://www.gov.uk/}"
OUTPUT_DIR="${2:-docs/screenshots}"

mkdir -p "$OUTPUT_DIR"

npx --yes lighthouse "$TARGET_URL" \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=html,json \
  --output-path="$OUTPUT_DIR/lighthouse-report" \
  --chrome-flags="--headless"

echo "Lighthouse reports saved in: $OUTPUT_DIR"
echo "Review the accessibility category and document the actual findings."
