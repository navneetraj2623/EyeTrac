const heatmapInstance = h337.create({
  container: document.body,
  radius: 40
});

function addPoint(x, y) {
  heatmapInstance.addData({ x, y, value: 1 });
}