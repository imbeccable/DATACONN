let raindrops = []
let resp;
let x;
let y;
let device;

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
    let command = input.data[0];
    let note = input.data[1];
    let velocity = input.data[2];

    if (velocity > 0) {
        // console.log(`command: ${command}, node: ${note}, velocity: ${velocity}`);
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
    console.log(`lon = ${sessionStorage.getItem("lon")}`) 
    console.log(`lat = ${sessionStorage.getItem("lat")}`) 

    if (note < 52) {
        // addLongitude(10);
        makeApiCall();
    } else if (note > 51 && note < 68) {
        // subLongitude(10)
        makeApiCall();
    } else if (note > 68 && note < 84) {
        // addLat(10);
        makeApiCall();     
    } else {
        // subLat(10);
        makeApiCall();
    }

    waves(resp,note);
}

class rain {
    constructor(x,y,d,speed) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.speed = speed;
    }
    
    display() {
        // fill(0,0,255);
        // circle(x,y,d);

        var canvas = document.getElementById('circle');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            var R = 20;
            ctx.beginPath();
            ctx.arc(x, y, R, 0, 2 * Math.PI, false);
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#FF0000';
            ctx.stroke();
        }
    }

    move() {
        this.x += this.speed;
    }
}

//
function waves(resp,note) {
    dew = resp["main"]["humidity"];
    var rand_city = pops[Math.floor(Math.random()*pops.length)]
    setLonLat(rand_city["Lon"],rand_city["Lat"]);
    console.log(rand_city)
    i=0;
    for (i;i<dew;i+=5) {
        if (note < 52) {
            raindrops.push(new rain(i+5,20,dew/2,5))
        } else if (note > 51 && note < 68) {
            raindrops.push(new rain(i+5,40,dew/2,5))
        } else if (note > 68 && note < 84) {
            raindrops.push(new rain(i+5,60,dew/2,5)) 
        } else {
            raindrops.push(new rain(i+5,80,dew/2,5))
        }
    }

    for (i=0;i<raindrops.length;i++) {
        raindrops[i].display();
        raindrops[i].move();
    }
}

function parseWeather(resp){
    temp = resp["main"]["temp"]
    windSpeed = resp["wind"]["speed"]
    console.log(`temp in farinheight = ${temp}\n wind speed in mph = ${windSpeed}`)
    return [temp, windSpeed];
}

function scaleProperly(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function changeDisplay(resp){
    let [temp, windSpeed] = parseWeather(resp);
    properTemp = scaleProperly(temp, 0, 120, 0, 255); 
    properWindspeed = scaleProperly(windSpeed,0,8,0,100);

    document.body.style.backgroundColor = `rgb(${properTemp},50,50)`;

}

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

function setLonLat(lon,lat){
    sessionStorage.setItem("lon", lon); 
    sessionStorage.setItem("lat", lat); 
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

