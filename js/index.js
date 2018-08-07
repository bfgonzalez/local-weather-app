var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = "C";
var currentTempCelsius;

//Determines if user's browser supports geolocation once page loads
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = "lat=" + position.coords.latitude;
    var lon = "lon=" + position.coords.longitude;
    getWeather(lat, lon);
  });
} else {
  console.log("This browser does not support geolocation.");
}

// Allows user to toggle between Celsius & Fahrenheit by clicking the "Celsius/Fahrenheit" text at the bottom
$("#switch").click(function () {
  var currentTempUnit = $("#temp-unit").text();
  var newTempUnit = currentTempUnit == "C" ? "F" : "C";
  $("#temp-unit").text(newTempUnit);

  if (newTempUnit == "F") {
    var fahr = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
    $("#temp").text(fahr + " " + String.fromCharCode(176));
  } else {
    $("#temp").text(currentTempCelsius + " " + String.fromCharCode(176));
  }
});

//App pulls in data from API for each respective text field
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (data) {
      $("#city").text(data.name + ", ");
      $("#country").text(data.sys.country);
      currentTempCelsius = Math.round(data.main.temp * 10) / 10;
      $("#temp").text(currentTempCelsius + " " + String.fromCharCode(176)); //String.fromCharCode(176) --> degree symbol
      $("#temp-unit").text(tempUnit);
      $("#desc").text(data.weather[0].main);
      IconGen(data.weather[0].main);
    }
  });
}

function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch (desc) {
    case "drizzle":
      addIcon(desc)
      break;
    case "clouds":
      addIcon(desc)
      break;
    case "rain":
      addIcon(desc)
      break;
    case "snow":
      addIcon(desc)
      break;
    case "clear":
      addIcon(desc)
      break;
    case "thunderstorm":
      addIcon(desc)
      break;
    default:
      $("div.clouds").removeClass("hide");
  }
}

function addIcon(desc) {
  $("div." + desc).removeClass("hide");
  $(".container-contents").show();
}