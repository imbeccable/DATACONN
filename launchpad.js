let raindrops = []
let resp;
let x;
let y;
let dew;
let color;
let device;

function makeApiCall(){
    url = "https://api.openweathermap.org/data/2.5/weather?"
    weatherKey = "bbd2f62f057e3b871240349153b66cfe"
    lat = sessionStorage.getItem("lat") 
    lon = sessionStorage.getItem("lon") 
    d = sessionStorage.getItem("dew");
    weatherParams = {"lat": lat,
                    "lon": lon,
                    "dew": d,
                    "units": "imperial",
                    "appid": weatherKey
                    }
    console.log(weatherParams)


    $.ajax({
        url: url,
        type: "GET",
        data: weatherParams,
        success: function(r){
            changeDisplay(r);
            setResp(r);
        },
        error: function(error){
            console.log(error)
        }
    });
}

function setResp(r) {
    resp = r;
}

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success,failure);
}

function failure() {
    console.log("Could not connect MIDI");
}

function updateDevices(event) {
    // console.log(event);
}

function success(midiAccess) {
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;

    for (let output of midiAccess.outputs.values()) {
        device = output;
    }


    inputs.forEach((inp) => {
        inp.addEventListener('midimessage', handleInput);
    });
}

function handleInput(input) {
    let note = input.data[1];
    let velocity = input.data[2];

    if (velocity > 0) {
        noteOn(note);
    }
    if (velocity == 0) {
        noteOff(note);
    }

}

function noteOn(note) {

    console.log(`note: ${note} // on`);
}

function noteOff(note) {
    console.log(`note: ${note} // off`);

    setXnY(note);

    makeApiCall();

    waves(resp);
}

// a class for displaying the visuals
class rain {    
    display() {
        var canvas = document.getElementById('circle');
        var humidity;
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            humidity = sessionStorage.getItem("dew")
            ctx.arc(x, y, humidity, 0, 2 * Math.PI, false);
            ctx.lineWidth = humidity/6;
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }
}

// finds the humidity
function setDew(resp){
    dew = resp["main"]["humidity"];
    sessionStorage.setItem("dew",dew);
}

// finds a random city in the pops.js file and sets the new longitude and latitude
// then finds the humidity and creates a new visual based on those values
function waves(resp) {
    var rand_city = pops[Math.floor(Math.random()*pops.length)]
    setLonLat(rand_city["Lon"],rand_city["Lat"]);   
    setDew(resp); 
    raindrops.push(new rain());

    i = 0;
    for (i;i<raindrops.length;i++) {
        raindrops[i].display();
    }
    
}

// finds temperature and wind speed at the given longitude and latitude
function parseWeather(resp){
    temp = resp["main"]["temp"]
    windSpeed = resp["wind"]["speed"]
    return [temp, windSpeed];
}

// scales the proper temp
function scaleProperly(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// changes the current color of the visual
function changeDisplay(resp){
    let [temp, windSpeed] = parseWeather(resp);
    properTemp = scaleProperly(temp, 0, 120, 0, 255); 
    properWindspeed = scaleProperly(windSpeed,0,8,0,100);
    document.body.style.backgroundColor = "black";
    color = `rgb(75,75,${properTemp})`;
}

// sets the x and y coordinates for each controller key
function setXnY(note) {

    if (note == 36) {
        x = 100;
        y = 800;
    } else if (note == 37) {
        x = 200;
        y = 800;    
    } else if (note == 38) {
        x = 300;
        y = 800;
    } else if (note == 39) {
        x = 400;
        y = 800;
    } else if (note == 40) {
        x = 100;
        y = 700;
    } else if (note == 41) {
        x = 200;
        y = 700;
    } else if (note == 42) {
        x = 300;
        y = 700;
    } else if (note == 43) {
        x = 400;
        y = 700;
    } else if (note == 44) {
        x = 100;
        y = 600;
    } else if (note == 45) {
        x = 200;
        y = 600;
    } else if (note == 46) {
        x = 300;
        y = 600;
    } else if (note == 47) {
        x = 400;
        y = 600;
    } else if (note == 48) {
        x = 100;
        y = 500;
    } else if (note == 49) {
        x = 200;
        y = 500;
    } else if (note == 50) {
        x = 300;
        y = 500;
    } else if (note == 51) {
        x = 400;
        y = 500;
    } else if (note == 52) {
        x = 100;
        y = 400;
    } else if (note == 53) {
        x = 200;
        y = 400;
    } else if (note == 54) {
        x = 300;
        y = 400;
    } else if (note == 55) {
        x = 400;
        y = 400;
    } else if (note == 56) {
        x = 100;
        y = 300;
    } else if (note == 57) {
        x = 200;
        y = 300;
    } else if (note == 58) {
        x = 300;
        y = 300;
    } else if (note == 59) {
        x = 400;
        y = 300;
    } else if (note == 60) {
        x = 100;
        y = 200;
    } else if (note == 61) {
        x = 200;
        y = 200;
    } else if (note == 62) {
        x = 300;
        y = 200;
    } else if (note == 63) {
        x = 400;
        y = 200;
    } else if (note == 64) {
        x = 100;
        y = 100;
    } else if (note == 65) {
        x = 200;
        y = 100;
    } else if (note == 66) {
        x = 300;
        y = 100;
    } else if (note == 67) {
        x = 400;
        y = 100;
    } else if (note == 68) {
        x = 500;
        y = 800;
    } else if (note == 69) {
        x = 600;
        y = 800;
    } else if (note == 70) {
        x = 700;
        y = 800;
    } else if (note == 71) {
        x = 800;
        y = 800;
    } else if (note == 72) {
        x = 500;
        y = 700;
    } else if (note == 73) {
        x = 600;
        y = 700;
    } else if (note == 74) {
        x = 700;
        y = 700;
    } else if (note == 75) {
        x = 800;
        y = 700;
    } else if (note == 76) {
        x = 500;
        y = 600;
    } else if (note == 77) {
        x = 600;
        y = 600;
    } else if (note == 78) {
        x = 700;
        y = 600;
    } else if (note == 79) {
        x = 800;
        y = 600;
    } else if (note == 80) {
        x = 500;
        y = 500;
    } else if (note == 81) {
        x = 600;
        y = 500;
    } else if (note == 82) {
        x = 700;
        y = 500;
    } else if (note == 83) {
        x = 800;
        y = 500;
    } else if (note == 84) {
        x = 500;
        y = 400;
    } else if (note == 85) {
        x = 600;
        y = 400;
    } else if (note == 86) {
        x = 700;
        y = 400;
    } else if (note == 87) {
        x = 800;
        y = 400;
    } else if (note == 88) {
        x = 500;
        y = 300;
    } else if (note == 89) {
        x = 600;
        y = 300;
    } else if (note == 90) {
        x = 700;
        y = 300;
    } else if (note == 91) {
        x = 800;
        y = 300;
    } else if (note == 92) {
        x = 500;
        y = 200;
    } else if (note == 93) {
        x = 600;
        y = 200;
    } else if (note == 94) {
        x = 700;
        y = 200;
    } else if (note == 95) {
        x = 800;
        y = 200;
    } else if (note == 96) {
        x = 500;
        y = 100;
    } else if (note == 97) {
        x = 600;
        y = 100;
    } else if (note == 98) {
        x = 700;
        y = 100;
    } else {
        x = 800;
        y = 100;
    } 
}

// sets the longitude and latitude into the session storage
function setLonLat(lon,lat){
    sessionStorage.setItem("lon", lon); 
    sessionStorage.setItem("lat", lat); 
}