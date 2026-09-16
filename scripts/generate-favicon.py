#!/usr/bin/env python3
"""
Script de geração de Favicons Oficiais da SEDEP
A partir de public/sedep-branco.png, gera:
- public/favicon.ico (16x16, 32x32, 48x48)
- public/favicon.png (32x32)
- public/favicon-48x48.png (48x48)
- public/apple-touch-icon.png (180x180)
"""

import os
from PIL import Image, ImageDraw
import numpy as np

def create_favicons():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_path = os.path.join(base_dir, 'public', 'sedep-branco.png')
    public_dir = os.path.join(base_dir, 'public')

    if not os.path.exists(logo_path):
        print(f"Erro: {logo_path} não encontrado.")
        return

    # 1. Carrega a logo original
    src_img = Image.open(logo_path).convert('RGBA')

    # 2. Recorta exatamente a área não transparente da logo (auto-crop)
    arr = np.array(src_img)
    alpha = arr[:, :, 3]
    ys, xs = np.where(alpha > 10)
    if len(ys) == 0 or len(xs) == 0:
        print("Erro: imagem vazia")
        return

    min_y, max_y = ys.min(), ys.max()
    min_x, max_x = xs.min(), xs.max()
    logo_cropped = src_img.crop((min_x, min_y, max_x + 1, max_y + 1))

    # 3. Função geradora de ícone em alta qualidade com squircle azul nobre SEDEP (#0B1E5B)
    def render_brand_icon(size: int, radius_ratio: float = 0.22, padding_ratio: float = 0.16) -> Image.Image:
        # Renderiza em 4x para super-sampling anti-aliasing perfeito
        scale = 4
        s = size * scale
        canvas = Image.new('RGBA', (s, s), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)

        # Fundo arredondado com o azul oficial SEDEP (#0B1E5B)
        # sRGB: (11, 30, 91)
        radius = int(s * radius_ratio)
        bg_color = (11, 30, 91, 255)
        draw.rounded_rectangle([0, 0, s - 1, s - 1], radius=radius, fill=bg_color)

        # Dimensionamento da logo mantendo a proporção exata
        padding = int(s * padding_ratio)
        max_w = s - (padding * 2)
        max_h = s - (padding * 2)

        lw, lh = logo_cropped.size
        ratio = min(max_w / lw, max_h / lh)
        target_w = max(1, int(lw * ratio))
        target_h = max(1, int(lh * ratio))

        logo_resized = logo_cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # Centraliza a logo no canvas
        offset_x = (s - target_w) // 2
        offset_y = (s - target_h) // 2
        canvas.paste(logo_resized, (offset_x, offset_y), logo_resized)

        # Reduz para a resolução final com filtro Lanczos
        return canvas.resize((size, size), Image.Resampling.LANCZOS)

    # 4. Gera as imagens em várias resoluções
    icon_16 = render_brand_icon(16)
    icon_32 = render_brand_icon(32)
    icon_48 = render_brand_icon(48)
    icon_180 = render_brand_icon(180, radius_ratio=0.22, padding_ratio=0.18)

    # Salva PNGs
    fav_32_path = os.path.join(public_dir, 'favicon.png')
    fav_48_path = os.path.join(public_dir, 'favicon-48x48.png')
    apple_touch_path = os.path.join(public_dir, 'apple-touch-icon.png')
    ico_path = os.path.join(public_dir, 'favicon.ico')

    icon_32.save(fav_32_path, format='PNG')
    icon_48.save(fav_48_path, format='PNG')
    icon_180.save(apple_touch_path, format='PNG')

    # Salva ICO contendo múltiplos tamanhos (16x16, 32x32, 48x48)
    icon_32.save(
        ico_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[icon_16, icon_48]
    )

    print("✅ Favicons gerados com sucesso:")
    print(f"  - {ico_path} (16x16, 32x32, 48x48)")
    print(f"  - {fav_32_path} (32x32)")
    print(f"  - {fav_48_path} (48x48)")
    print(f"  - {apple_touch_path} (180x180)")

if __name__ == '__main__':
    create_favicons()
