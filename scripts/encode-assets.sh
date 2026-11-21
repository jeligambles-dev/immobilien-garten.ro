#!/usr/bin/env bash
# Encode the story video, per-service clips and stills for the site.
# Usage: scripts/encode-assets.sh <story-4k.mp4> <stills-dir containing st-02.jpg … st-10.jpg>
set -euo pipefail
MASTER="$1"; STILLS="$2"
cd "$(dirname "$0")/.."
mkdir -p public/video/services public/img/services
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
X264=(-an -c:v libx264 -preset slow -tune film -bf 0 -pix_fmt yuv420p -movflags +faststart)

# Home story (scroll-scrubbed: short GOP, no B-frames)
ffmpeg -nostdin -y -v error -i "$MASTER" -vf "scale=2560:1440:flags=lanczos" "${X264[@]}" -crf 28 -g 8 public/video/story-1440.mp4
ffmpeg -nostdin -y -v error -i "$MASTER" -vf "scale=1280:720:flags=lanczos" "${X264[@]}" -crf 28 -g 6 public/video/story-720.mp4
ffmpeg -nostdin -y -v error -ss 0.3 -i "$MASTER" -frames:v 1 -vf "scale=2560:-1" -q:v 2 "$TMP/p.jpg"
cwebp -quiet -q 80 "$TMP/p.jpg" -o public/img/story-poster.webp

# Per-service loops: slug start next-start still-index
SEG="pavaje 2.96 6 02
tuns-gazon 6 9 03
scarificare 9 11.79 04
gazon-rulou 11.79 14.79 05
gazon-artificial 14.79 17.83 06
gard-viu 17.83 20.71 07
toaletare-pomi 20.71 23.63 08
plantari 23.63 26.54 09
irigatii 26.54 30.0 10"
while read -r slug start next idx; do
  ss=$(echo "$start + 0.15" | bc); len=$(echo "$next - $start - 0.3" | bc)
  ffmpeg -nostdin -y -v error -ss "$ss" -i "$MASTER" -t "$len" -vf "scale=1920:1080:flags=lanczos" "${X264[@]}" -crf 26 -g 48 "public/video/services/$slug.mp4"
  ffmpeg -nostdin -y -v error -ss "$(echo "$start + 0.5" | bc)" -i "$MASTER" -frames:v 1 -vf "scale=1920:-1" -q:v 2 "$TMP/$slug.jpg"
  cwebp -quiet -q 80 "$TMP/$slug.jpg" -o "public/img/services/$slug-poster.webp"
  cwebp -quiet -q 80 -resize 1600 0 "$STILLS/st-$idx.jpg" -o "public/img/services/$slug.webp"
done <<< "$SEG"
