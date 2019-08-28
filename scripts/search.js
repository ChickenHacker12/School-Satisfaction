var districtBox = document.getElementById("district-box");
var searchForm = document.getElementById("search-form");
var mainBox = document.getElementsByTagName("main")[0];
var request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var object = JSON.parse(this.responseText);
    object.districts.forEach(function (d, n) {
      var option = document.createElement("option");
      option.setAttribute("value", object.districts[n]);
      var optionText = document.createTextNode(object.districts[n].replace(/_/g, " "));
      option.appendChild(optionText);
      districtBox.appendChild(option);
    });
  }
}
request.open("GET", "districts/districts.json", true);
request.send();
