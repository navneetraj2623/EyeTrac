let screenW = window.innerWidth;
let screenH = window.innerHeight;

let calibrationPoints = [
  { x: screenW * 0.1, y: screenH * 0.1 },
  { x: screenW * 0.25, y: screenH * 0.1 },
  { x: screenW * 0.5, y: screenH * 0.1 },
  { x: screenW * 0.75, y: screenH * 0.1 },
  { x: screenW * 0.9, y: screenH * 0.1 },

  { x: screenW * 0.1, y: screenH * 0.5 },
  { x: screenW * 0.25, y: screenH * 0.5 },
  { x: screenW * 0.5, y: screenH * 0.5 },
  { x: screenW * 0.75, y: screenH * 0.5 },
  { x: screenW * 0.9, y: screenH * 0.5 },

  { x: screenW * 0.1, y: screenH * 0.9 },
  { x: screenW * 0.25, y: screenH * 0.9 },
  { x: screenW * 0.5, y: screenH * 0.9 },
  { x: screenW * 0.75, y: screenH * 0.9 },
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

    setTimeout(() => {
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
        console.warn(` No gaze prediction available at point ${i + 1}`);
      }

      document.body.removeChild(dot);
      i++;
      setTimeout(showNextPoint, 500); // short delay between dots
    }, 2000); // wait time for user to fixate on the dot
  }

  showNextPoint();
}
