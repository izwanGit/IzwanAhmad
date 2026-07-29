import math

# Dimensions of the SVG container
width = 800
height = 800
cx = width / 2
cy = height / 2

svg_header = f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">\n'
svg_footer = '</svg>'

defs = """
<defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06B6D4" />
        <stop offset="50%" stop-color="#0E7490" />
        <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
</defs>
"""

circles = []

# Ring parameters matching the PETRONAS design system photo:
# Concentric layers of dots forming a halo ring
min_radius = 160
max_radius = 360
mid_radius = (min_radius + max_radius) / 2
ring_thickness = max_radius - min_radius

num_rings = 18

for i in range(num_rings):
    r = min_radius + (i / (num_rings - 1)) * ring_thickness
    
    # Distance from center of ring thickness
    dist_from_mid = abs(r - mid_radius)
    norm_dist = dist_from_mid / (ring_thickness / 2) # 0 at mid, 1 at edges
    
    # Halftone sizing: largest in the middle of the ring thickness, smaller at inner/outer edges
    base_dot_r = 9.5 * (1 - norm_dist ** 1.8) + 1.2
    
    # Number of dots on this ring proportional to radius
    circumference = 2 * math.pi * r
    dot_spacing = 26 # spacing between dot centers along circumference
    num_dots = int(circumference / dot_spacing)
    
    for j in range(num_dots):
        angle = (j / num_dots) * 2 * math.pi
        
        # Calculate dot position
        x = cx + r * math.cos(angle)
        y = cy + r * math.sin(angle)
        
        # Color variation based on angle
        # Fade slightly on one side to create dynamic crescent effect
        angle_factor = (math.sin(angle) + 1) / 2 # 0 to 1
        dot_r = base_dot_r * (0.4 + 0.6 * angle_factor)
        
        opacity = 0.25 + 0.7 * angle_factor
        
        if dot_r > 0.8:
            circles.append(
                f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{dot_r:.2f}" fill="url(#ringGrad)" opacity="{opacity:.2f}" />'
            )

with open('public/images/izwan-petronas-ring.svg', 'w') as f:
    f.write(svg_header + defs + "\n".join(circles) + "\n" + svg_footer)

print("Generated izwan-petronas-ring.svg successfully!")
