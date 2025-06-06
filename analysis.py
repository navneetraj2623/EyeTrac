import json
import numpy as np
import matplotlib.pyplot as plt

with open("data/gazeData.json") as f:
    data = json.load(f)

gx = [point['x'] for point in data if 'x' in point]
gy = [point['y'] for point in data if 'y' in point]

plt.figure(figsize=(6, 4))
plt.hist2d(gx, gy, bins=30, cmap='hot')
plt.title("Gaze Heatmap")
plt.colorbar()
plt.savefig("static/heatmap.png")
print("Analysis complete: Heatmap generated.")