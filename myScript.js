var ajax = new XMLHttpRequest();
ajax.open("GET", "heatmap/heatmap.html", true);
ajax.send();
ajax.onclick = function(e) {
  var div = document.createElement("btnDiv");
  console.log(div)
}