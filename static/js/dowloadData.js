function downloadData() {
  if(!gazeData|| gazeData.length==0){
    alert("No gaze data collected yet");
    return ;
  }
  const blob = new Blob([JSON.stringify(gazeData,null,2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "/data/gazeData.json";
  a.click();
  URL.revokeObjectURL(url);
}
