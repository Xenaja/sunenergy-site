#!/bin/sh
# Делает лёгкие копии фото артистов (нужен ImageMagick):
#   img/thumb/*.webp — для кружков, img/full/*.webp — для попапа «Подробнее».
# Запуск из папки tilda: sh make-photos.sh
cd "$(dirname "$0")/img" || exit 1
mkdir -p thumb full
for f in *.jpg *.jpeg *.png; do
  [ -f "$f" ] || continue
  n="${f%.*}"
  magick "$f" -auto-orient -strip -resize "480x480^" -quality 78 "thumb/$n.webp"
  magick "$f" -auto-orient -strip -resize "1200x1200>" -quality 80 "full/$n.webp"
  echo "ok $f"
done
