#!/usr/bin/env bash
# Builds the web fonts in app/fonts from the TTF/OTF masters beside them
# (performance pass, 20 Nov 2026). The masters were shipped as-is: 10 files,
# 1.5 MB, every one preloaded. This writes a WOFF2 next to each, subset to
# Latin (with every Latin Extended block, so all Western and Central European
# languages, Serbian included), punctuation, currency, arrows, maths and
# common symbols. All OpenType features and hinting are kept, so text renders
# exactly as before.
#
# Needs Python fontTools and brotli: `pip install fonttools brotli`.
# Run from the repo root: `bash scripts/subset-fonts.sh`.
set -euo pipefail

UNICODES="U+0000-00FF,U+0100-024F,U+0259,U+02B0-02FF,U+0300-036F,U+1E00-1EFF,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F,U+2150-218F,U+2190-21FF,U+2200-22FF,U+2300-23FF,U+25A0-25FF,U+2600-26FF,U+2700-27BF,U+FB00-FB06,U+FEFF,U+FFFD"

# Only the masters app/fonts/index.ts uses (Saans text weights and Inter
# Variable sit in the folder unused).
for src in app/fonts/sfpro/*.otf app/fonts/saans/SaansMono-*.otf app/fonts/inter-display/*.ttf; do
  out="${src%.*}.woff2"
  python3 -m fontTools.subset "$src" \
    --unicodes="$UNICODES" \
    --layout-features='*' \
    --flavor=woff2 \
    --output-file="$out"
  printf '%-48s %6s KB -> %5s KB\n' "$src" "$(( $(stat -f%z "$src") / 1024 ))" "$(( $(stat -f%z "$out") / 1024 ))"
done
