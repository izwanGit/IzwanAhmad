import math

width = 1200
height = 600

# We want large dots, sweeping from bottom left to top right
# with varying sizes (larger in the middle of the wave)

svg_header = f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">\n'
svg_footer = '</svg>'

# Gradient definition
defs = """
<defs>
    <linearGradient id="waveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#0E7490" />
        <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
</defs>
"""

circles = []

# Dot spacing
spacing = 30

for x in range(0, width + spacing, spacing):
    for y in range(0, height + spacing, spacing):
        # Calculate distance to a sine wave curve
        # Curve: y = height/2 + sin(x / 200) * 150 - (x/width)*100
        curve_y = height/2 + math.sin(x / 250) * 180 - (x/width)*100 + 100
        
        # Distance from current point to the curve
        dist = abs(y - curve_y)
        
        # If within the wave band
        if dist < 200:
            # Base radius
            max_r = 12
            # Size fades out as it gets further from the curve center
            r = max_r * (1 - (dist / 200)**1.5)
            
            # Fade out at the edges of the canvas
            fade_x = min(x, width - x) / 200.0
            fade_x = min(max(fade_x, 0), 1)
            
            r *= fade_x
            
            if r > 1:
                # Add a subtle offset to make it look dynamic
                offset_y = math.cos(x/50) * 5
                circles.append(f'<circle cx="{x}" cy="{y + offset_y}" r="{r:.2f}" fill="url(#waveGrad)" />')

with open('public/images/izwan-wave-code.svg', 'w') as f:
    f.write(svg_header + defs + "\n".join(circles) + "\n" + svg_footer)

print("Generated izwan-wave-code.svg")
