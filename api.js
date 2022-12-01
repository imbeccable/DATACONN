

function makeApiCall(){
    url = "https://api.openweathermap.org/data/2.5/weather?"
    weatherKey = "bbd2f62f057e3b871240349153b66cfe"
    lat = sessionStorage.getItem("lat") 
    lon = sessionStorage.getItem("lon") 
    weatherParams = {"lat": lat,
                        "lon": lon,
                        "units": "imperial",
                        "appid": weatherKey
                        }
    console.log(weatherParams)


    $.ajax({
        url: url,
        type: "GET",
        data: weatherParams,
        success: function(resp){
            changeDisplay(resp);
        },
        error: function(error){
            console.log(error)
        }
    });
}

function parseWeather(resp){
    temp = resp["main"]["temp"]
    windSpeed = resp["wind"]["speed"]
    console.log(`temp in farinheight = ${temp}\n wind speed in mph = ${windSpeed}`)
    return [temp, windSpeed];
}

function initializeLonLat(){
    startLongitude = 50.0;
    startLattitude = 50.0;
    sessionStorage.setItem("lon", startLongitude); 
    sessionStorage.setItem("lat", startLattitude); 
}

// each key adds or subtracts from long and lat

function addLongitude(number){
    previousLon = parseFloat(sessionStorage.getItem("lon"))
    newLon = previousLon + number;
    sessionStorage.setItem("lon", newLon);
    console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
}

function subLongitude(number){
    previousLon = parseFloat(sessionStorage.getItem("lon"))
    newLon = previousLon - number;
    sessionStorage.setItem("lon", newLon);
    console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
}

function addLat(number){
    previousLon = parseFloat(sessionStorage.getItem("lat"))
    newLat = previousLon + number;
    sessionStorage.setItem("lat", newLat);
    console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
}

function subLat(number){
    previousLon = parseFloat(sessionStorage.getItem("lat"))
    newLat = previousLon - number;
    sessionStorage.setItem("lat", newLat);
    console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
}