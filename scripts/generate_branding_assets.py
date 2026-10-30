#!/usr/bin/env python3
"""
Payments on Tap Branding Assets Generator (Visa, Mastercard, Amex Trio Theme)
Generates:
- public/favicon.svg
- public/favicon.ico
- public/apple-touch-icon.png (180x180)
- public/icon-192.png (192x192)
- public/icon-512.png (512x512)
- public/og-image.png (1200x630)
"""

import os
from PIL import Image, ImageDraw, ImageFont

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

# SVG Favicon (Visa Blue, Mastercard Orange, Amex Deep Blue Interlocking Circles)
SVG_CONTENT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d"/>
      <stop offset="100%" stop-color="#050811"/>
    </linearGradient>
    <linearGradient id="visa" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0057B8"/>
      <stop offset="100%" stop-color="#003B7A"/>
    </linearGradient>
    <linearGradient id="mc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EB001B"/>
      <stop offset="100%" stop-color="#F79E1B"/>
    </linearGradient>
    <linearGradient id="amex" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#006FCF"/>
      <stop offset="100%" stop-color="#002663"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#bg)"/>
  <rect x="2" y="2" width="96" height="96" rx="22" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.3"/>
  
  <!-- Interlocking Trio Nodes (Visa, MC, Amex) -->
  <circle cx="36" cy="42" r="18" fill="url(#visa)" opacity="0.85"/>
  <circle cx="64" cy="42" r="18" fill="url(#mc)" opacity="0.85"/>
  <circle cx="50" cy="62" r="18" fill="url(#amex)" opacity="0.85"/>
  
  <!-- Center Tap Node -->
  <circle cx="50" cy="49" r="6" fill="#10B981" stroke="#ffffff" stroke-width="2"/>
</svg>'''

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(SVG_CONTENT)
print("✓ Generated favicon.svg")

def create_raster_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Rounded dark background
    corner_r = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size, size], radius=corner_r, fill=(10, 15, 29, 255))
    draw.rounded_rectangle([2, 2, size-2, size-2], radius=corner_r, outline=(59, 130, 246, 75), width=int(max(1, size*0.015)))
    
    # 3 Interlocking Circles
    r = size * 0.18
    # Visa Blue (Top Left)
    draw.ellipse([size*0.36 - r, size*0.42 - r, size*0.36 + r, size*0.42 + r], fill=(0, 87, 184, 215))
    # MC Orange (Top Right)
    draw.ellipse([size*0.64 - r, size*0.42 - r, size*0.64 + r, size*0.42 + r], fill=(235, 0, 27, 215))
    # Amex Blue (Bottom Center)
    draw.ellipse([size*0.50 - r, size*0.62 - r, size*0.50 + r, size*0.62 + r], fill=(0, 111, 207, 215))
    
    # Center Tap Green Dot
    cr = size * 0.06
    draw.ellipse([size*0.5 - cr, size*0.49 - cr, size*0.5 + cr, size*0.49 + cr], fill=(16, 185, 129, 255), outline=(255, 255, 255, 255), width=int(max(1, size*0.02)))
    
    return img

# Generate PNG icons
icon_180 = create_raster_icon(180)
icon_180.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG")
icon_192 = create_raster_icon(192)
icon_192.save(os.path.join(PUBLIC_DIR, "icon-192.png"), "PNG")
icon_512 = create_raster_icon(512)
icon_512.save(os.path.join(PUBLIC_DIR, "icon-512.png"), "PNG")

# Generate ICO
icon_32 = create_raster_icon(32)
icon_32.save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO")
print("✓ Generated apple-touch-icon.png, icon-192.png, icon-512.png, favicon.ico")

# Generate OG Image (1200x630)
og_img = Image.new("RGBA", (1200, 630), (10, 15, 29, 255))
og_draw = ImageDraw.Draw(og_img)
# Draw background gradient bars
for i in range(1200):
    alpha = int(35 * (1 - i / 1200))
    og_draw.line([(i, 0), (i, 630)], fill=(0, 87, 184, alpha))

# Large Trio Visual on the Right
r_big = 100
og_draw.ellipse([880 - r_big, 315 - 40 - r_big, 880 + r_big, 315 - 40 + r_big], fill=(0, 87, 184, 210))
og_draw.ellipse([1040 - r_big, 315 - 40 - r_big, 1040 + r_big, 315 - 40 + r_big], fill=(235, 0, 27, 210))
og_draw.ellipse([960 - r_big, 315 + 60 - r_big, 960 + r_big, 315 + 60 + r_big], fill=(0, 111, 207, 210))
og_draw.ellipse([960 - 30, 315 - 30, 960 + 30, 315 + 30], fill=(16, 185, 129, 255), outline=(255, 255, 255, 255), width=6)

og_img.convert("RGB").save(os.path.join(PUBLIC_DIR, "og-image.png"), "PNG")
print("✓ Generated og-image.png")
