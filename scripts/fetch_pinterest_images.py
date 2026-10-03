import os
import re
import urllib.request
from PIL import Image

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

def get_photos(query, count=6):
    q_slug = query.replace(' ', '-')
    url = f'https://unsplash.com/s/photos/{q_slug}'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        matches = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html)
        unique = []
        for m in matches:
            if m not in unique:
                unique.append(m)
        return unique[:count]
    except Exception as e:
        print(f"Error searching {query}: {e}")
        return []

def download_and_crop(url, out_path, size=(800, 800)):
    full_url = f"{url}?w=1000&auto=format&fit=crop&q=85"
    req = urllib.request.Request(full_url, headers=HEADERS)
    tmp_path = out_path + ".tmp"
    try:
        with urllib.request.urlopen(req, timeout=12) as response, open(tmp_path, 'wb') as out_file:
            out_file.write(response.read())
        
        # Open and crop to square with high quality
        with Image.open(tmp_path) as img:
            img = img.convert('RGB')
            w, h = img.size
            min_dim = min(w, h)
            left = (w - min_dim) // 2
            top = (h - min_dim) // 2
            right = left + min_dim
            bottom = top + min_dim
            cropped = img.crop((left, top, right, bottom))
            resized = cropped.resize(size, Image.Resampling.LANCZOS)
            resized.save(out_path, "JPEG", quality=90)
        
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        print(f"Saved: {out_path}")
        return True
    except Exception as e:
        print(f"Failed to process {url} -> {out_path}: {e}")
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        return False

# Target Pinterest aesthetic pieces requested by user:
# Western Girly Accessories, Pendants, Bangles
ITEMS = {
    'bow-pearl-pendant': 'bow-necklace-pearl-jewelry',
    'heart-locket-pendant': 'heart-pendant-gold-necklace',
    'clover-pearl-pendant': 'clover-necklace-jewelry',
    'cherry-crystal-pendant': 'cherry-pendant-necklace',
    'celestial-star-pendant': 'gold-star-pendant-necklace',
    'butterfly-gold-pendant': 'butterfly-necklace-gold',
    'molten-gold-bangles': 'gold-bangles-bracelets',
    'chunky-stacking-bangles': 'stacking-gold-bangles',
    'croissant-dome-cuff': 'gold-cuff-bracelet-jewelry',
    'pearl-charm-bangle': 'pearl-bracelet-bangle',
    'coquette-bow-earrings': 'bow-earrings-gold',
    'croissant-dome-ring': 'gold-dome-ring-jewelry',
    'girly-hair-bow-clip': 'silk-bow-hair-accessory',
    'aesthetic-wrist-stack': 'gold-bracelet-stack-jewelry'
}

out_dir = os.path.join('public', 'images', 'products')
os.makedirs(out_dir, exist_ok=True)

for key, query in ITEMS.items():
    print(f"\nSearching for {key} ({query})...")
    photos = get_photos(query, count=5)
    print(f"Found {len(photos)} photos")
    if not photos:
        # Fallback to general aesthetic query
        photos = get_photos('gold-jewelry-aesthetic', count=4)
    
    # Save 3 shots: 1 (studio), 2 (detail), 3 (lifestyle)
    for i, shot in enumerate(['1', '2', '3']):
        out_file = os.path.join(out_dir, f"{key}-{shot}.jpg")
        photo_url = photos[i % len(photos)] if photos else None
        if photo_url:
            download_and_crop(photo_url, out_file)

print("\nDone downloading Pinterest aesthetic images!")
