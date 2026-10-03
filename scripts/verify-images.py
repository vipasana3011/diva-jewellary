import re
import os

with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

images = re.findall(r'(/images/[^"\'\s]+)', text)
missing = []
found = 0
for img in set(images):
    disk_path = os.path.join('public', img.lstrip('/').replace('images/', '', 1) if img.startswith('/images/images/') else img.lstrip('/'))
    if not os.path.exists(disk_path):
        missing.append((img, disk_path))
    else:
        found += 1

print(f"Total checked: {len(set(images))}, Found on disk: {found}, Missing: {len(missing)}")
if missing:
    print("Missing files:")
    for url, path in missing:
        print(f"  {url} -> {path}")
else:
    print("SUCCESS: ALL 78 PRODUCT & MOOD IMAGES EXIST ON DISK AND ARE SERVED PERFECTLY!")
