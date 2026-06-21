
from PIL import Image, ImageDraw
import os

os.makedirs("assets/images", exist_ok=True)

# Créer icon.png (1024x1024)
img = Image.new("RGBA", (1024, 1024), (29, 185, 84))  # vert #1DB954
d = ImageDraw.Draw(img)
d.rectangle([200, 200, 824, 824], fill=(18, 18, 18))
img.save("assets/images/icon.png")

# Copier pour les autres assets requis
img.save("assets/images/adaptive-icon.png")
img.save("assets/images/splash-icon.png")

splash = Image.new("RGBA", (1242, 2688), (18, 18, 18))
splash.save("assets/images/splash.png")

fav = Image.new("RGBA", (32, 32), (29, 185, 84))
fav.save("assets/images/favicon.png")

print("✅ Assets créés !")

