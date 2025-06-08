// calibration.js

let screenW = window.innerWidth;
let screenH = window.innerHeight;

let calibrationPoints = [
  { x: screenW * 0.1, y: screenH * 0.1 }, // Top-left
  { x: screenW * 0.25, y: screenH * 0.1 }, // Top-center
  { x: screenW * 0.5, y: screenH * 0.1 }, // Top-left
  { x: screenW * 0.75, y: screenH * 0.1 }, // Top-center
  { x: screenW * 0.9, y: screenH * 0.1 }, // Top-right

  { x: screenW * 0.1, y: screenH * 0.5 }, // Mid-left
  { x: screenW * 0.25, y: screenH * 0.5 }, // Center
  { x: screenW * 0.5, y: screenH * 0.5 }, // Mid-left
  { x: screenW * 0.75, y: screenH * 0.5 },
  { x: screenW * 0.9, y: screenH * 0.5 }, // Mid-right

  { x: screenW * 0.1, y: screenH * 0.9 }, // Bottom-left
  { x: screenW * 0.25, y: screenH * 0.9 }, // Bottom-center
  { x: screenW * 0.5, y: screenH * 0.9 },  // Bottom-right
  { x: screenW * 0.75, y: screenH * 0.9 }, // Bottom-left
  { x: screenW * 0.9, y: screenH * 0.9 },
];

let collectedData = [];

function startCalibration() {
  let i = 0;

  function showNextPoint() {
    if (i >= calibrationPoints.length) {
      console.log("✅ Calibration complete:", collectedData);
      localStorage.setItem("calibrationData", JSON.stringify(collectedData));
      return;
    }

    const dot = document.createElement("div");
    dot.className = "calibration-dot";
    dot.style.left = calibrationPoints[i].x + "px";
    dot.style.top = calibrationPoints[i].y + "px";
    dot.innerText = "+";
    dot.style.color = "white";
    dot.style.display = "flex";
    dot.style.justifyContent = "center";
    dot.style.alignItems = "center";

    document.body.appendChild(dot);

    dot.addEventListener("click", () => {
      const prediction = webgazer.getCurrentPrediction();

      if (prediction) {
        collectedData.push({
          screenX: calibrationPoints[i].x,
          screenY: calibrationPoints[i].y,
          gazeX: prediction.x,
          gazeY: prediction.y
        });
        console.log(` Captured at point ${i + 1}:`, prediction);
      } else {
        console.warn(" No gaze prediction available");
      }

      document.body.removeChild(dot);
      i++;
      setTimeout(showNextPoint, 500);
    });
  }

  showNextPoint();
}
