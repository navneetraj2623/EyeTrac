function startTracking() {
  webgazer.setRegression('ridge')
         .setGazeListener((data, timestamp) => {
            if (data) {
              console.log(data);
              // Send data to backend later
            }
         }).begin();

  webgazer.showVideoPreview(true).showPredictionPoints(true);
}