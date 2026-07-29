import math

width = 1400
height = 800

svg_header = f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">\n'
svg_footer = '</svg>'

defs = """
<defs>
    <!-- Vibrant Cyan to Deep Teal Gradients -->
    <linearGradient id="gradTopRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#0E7490" stop-opacity="0.75" />
    </linearGradient>

    <linearGradient id="gradBottom" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0E7490" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.85" />
    </linearGradient>

    <linearGradient id="gradTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#0E7490" stop-opacity="0.3" />
    </linearGradient>
</defs>
"""

elements = []

def generate_ribbon(curve_func, num_tracks, dots_per_track, grad_id, base_opacity, max_dot_size=7.0):
    for track in range(num_tracks):
        # Track offset perpendicular to curve tangent
        track_offset = (track - (num_tracks - 1) / 2) * 16
        
        for i in range(dots_per_track):
            t = i / (dots_per_track - 1) # 0.0 to 1.0
            
            cx, cy, dx, dy = curve_func(t)
            
            # Normal vector calculation
            norm_len = math.hypot(dx, dy)
            if norm_len == 0:
                nx, ny = 0, 1
            else:
                nx, ny = -dy / norm_len, dx / norm_len
            
            x = cx + nx * track_offset
            y = cy + ny * track_offset
            
            # Skip dots outside bounds
            if x < -50 or x > width + 50 or y < -50 or y > height + 50:
                continue

            # Halftone sizing envelope across track bundle width
            track_center_factor = 1.0 - (abs(track - (num_tracks - 1) / 2) / (num_tracks / 2)) ** 1.5
            
            # Envelope along ribbon length (tapered at ends)
            length_envelope = math.sin(t * math.pi)
            
            dot_r = (max_dot_size * length_envelope * (0.25 + 0.75 * track_center_factor)) + 0.8
            opacity = base_opacity * (0.3 + 0.7 * length_envelope)
            
            if dot_r > 0.7:
                elements.append(
                    f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{dot_r:.2f}" fill="url(#{grad_id})" opacity="{opacity:.2f}" />'
                )

# Ribbon 1: Top-Right Laptop Showcase Frame (Sweeps gracefully around right side)
def ribbon_top_right(t):
    # Curve starting top-center sweeping around the laptop on right
    x = 550 + t * 850
    y = 60 + math.sin(t * math.pi * 0.9) * 320 + (t * 220)
    dx = 850
    dy = math.cos(t * math.pi * 0.9) * 0.9 * math.pi * 320 + 220
    return x, y, dx, dy

# Ribbon 2: Bottom Runway Stream (Sweeps under metrics row)
def ribbon_bottom(t):
    x = t * width
    y = 730 - math.sin(t * math.pi * 1.1) * 160
    dx = width
    dy = -math.cos(t * math.pi * 1.1) * 1.1 * math.pi * 160
    return x, y, dx, dy

# Ribbon 3: Top-Left Accent Arch (Subtle arch above headline)
def ribbon_top_left(t):
    x = t * 650
    y = 90 - math.sin(t * math.pi) * 70
    dx = 650
    dy = -math.cos(t * math.pi) * math.pi * 70
    return x, y, dx, dy

# Generate 3 non-collapsing, distinct ribbons
generate_ribbon(ribbon_top_right, num_tracks=8, dots_per_track=80, grad_id="gradTopRight", base_opacity=0.55, max_dot_size=7.5)
generate_ribbon(ribbon_bottom, num_tracks=6, dots_per_track=75, grad_id="gradBottom", base_opacity=0.45, max_dot_size=6.5)
generate_ribbon(ribbon_top_left, num_tracks=4, dots_per_track=50, grad_id="gradTopLeft", base_opacity=0.35, max_dot_size=5.0)

with open('public/images/izwan-generative-ribbons.svg', 'w') as f:
    f.write(svg_header + defs + "\n".join(elements) + "\n" + svg_footer)

print("Generated non-collapsing izwan-generative-ribbons.svg successfully!")
