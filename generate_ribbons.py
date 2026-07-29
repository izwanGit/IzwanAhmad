import math

width = 1400
height = 800

svg_header = f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">\n'
svg_footer = '</svg>'

defs = """
<defs>
    <linearGradient id="tealCyanGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E7490" stop-opacity="0.9" />
        <stop offset="60%" stop-color="#06B6D4" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#0284C7" stop-opacity="0.85" />
    </linearGradient>

    <linearGradient id="tealCyanGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#0E7490" stop-opacity="0.7" />
    </linearGradient>

    <linearGradient id="tealCyanGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0E7490" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.4" />
    </linearGradient>
</defs>
"""

elements = []

def generate_ribbon(curve_func, num_tracks, dots_per_track, grad_id, base_opacity):
    for track in range(num_tracks):
        # Track offset perpendicular-ish to curve
        track_offset = (track - (num_tracks - 1) / 2) * 18
        
        for i in range(dots_per_track):
            t = i / (dots_per_track - 1) # 0.0 to 1.0
            
            # Base curve coordinates
            cx, cy, dx, dy = curve_func(t)
            
            # Normal vector to curve
            norm_len = math.hypot(dx, dy)
            if norm_len == 0:
                nx, ny = 0, 1
            else:
                nx, ny = -dy / norm_len, dx / norm_len
            
            x = cx + nx * track_offset
            y = cy + ny * track_offset
            
            # Halftone sizing along the ribbon width and length
            # Center of track bundle has bigger dots
            track_center_factor = 1.0 - abs(track - (num_tracks - 1) / 2) / (num_tracks / 2)
            
            # Envelope along length: zero at ends, peak in middle
            length_envelope = math.sin(t * math.pi)
            
            max_r = 7.5
            dot_r = (max_r * length_envelope * (0.3 + 0.7 * track_center_factor)) + 1.0
            
            opacity = base_opacity * (0.3 + 0.7 * length_envelope)
            
            if dot_r > 0.8:
                elements.append(
                    f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{dot_r:.2f}" fill="url(#{grad_id})" opacity="{opacity:.2f}" />'
                )

# Ribbon 1: Main sweeping diagonal S-curve
def ribbon1(t):
    x = t * width
    y = 200 + math.sin(t * math.pi * 1.5) * 180 + (t * 250)
    # Derivative for normal calculation
    dx = width
    dy = math.cos(t * math.pi * 1.5) * 1.5 * math.pi * 180 + 250
    return x, y, dx, dy

# Ribbon 2: Secondary counter-curve intersecting elegantly
def ribbon2(t):
    x = t * width
    y = 650 - math.sin(t * math.pi * 1.2 + 0.5) * 220 - (t * 200)
    dx = width
    dy = -math.cos(t * math.pi * 1.2 + 0.5) * 1.2 * math.pi * 220 - 200
    return x, y, dx, dy

# Ribbon 3: High accent top curve
def ribbon3(t):
    x = 200 + t * (width - 200)
    y = 120 + math.cos(t * math.pi * 1.8) * 130
    dx = width - 200
    dy = -math.sin(t * math.pi * 1.8) * 1.8 * math.pi * 130
    return x, y, dx, dy

generate_ribbon(ribbon1, num_tracks=9, dots_per_track=85, grad_id="tealCyanGrad1", base_opacity=0.45)
generate_ribbon(ribbon2, num_tracks=7, dots_per_track=75, grad_id="tealCyanGrad2", base_opacity=0.35)
generate_ribbon(ribbon3, num_tracks=5, dots_per_track=65, grad_id="tealCyanGrad3", base_opacity=0.25)

with open('public/images/izwan-generative-ribbons.svg', 'w') as f:
    f.write(svg_header + defs + "\n".join(elements) + "\n" + svg_footer)

print("Generated izwan-generative-ribbons.svg successfully!")
