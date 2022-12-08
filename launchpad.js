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
        fill(0,0,255);
        circle(x,y,d)
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
    console.log("got out")

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
        x = windowWidth/8;
        y = windowHeight - windowHeight/8
    } else if (note == 37) {
        x = windowWidth/7;
        y = windowHeight - windowHeight/8        
    } else if (note == 38) {
        x = windowWidth/6;
        y = windowHeight - windowHeight/8
    } else if (note == 39) {
        x = windowWidth/5;
        y = windowHeight - windowHeight/8
    } else if (note == 40) {
        
    } else if (note == 41) {
        
    } else if (note == 42) {
        
    } else if (note == 43) {
        
    } else if (note == 44) {
        
    } else if (note == 45) {
        
    } else if (note == 46) {
        
    } else if (note == 47) {
        
    } else if (note == 48) {
        
    } else if (note == 49) {
        
    } else if (note == 50) {
        
    } else if (note == 51) {
        
    } else if (note == 52) {
        
    } else if (note == 53) {
        
    } else if (note == 54) {
        
    } else if (note == 55) {
        
    } else if (note == 56) {
        
    } else if (note == 57) {
        
    } else if (note == 58) {
        
    } else if (note == 59) {
        
    } else if (note == 60) {
        
    } else if (note == 61) {
        
    } else if (note == 62) {
        
    } else if (note == 63) {
        
    } else if (note == 64) {
        
    } else if (note == 65) {
        
    } else if (note == 66) {
        
    } else if (note == 67) {
        
    } else if (note == 68) {
        
    } else if (note == 69) {
        
    } else if (note == 70) {
        
    } else if (note == 71) {
        
    } else if (note == 72) {
        
    } else if (note == 73) {
        
    } else if (note == 74) {
        
    } else if (note == 75) {
        
    } else if (note == 76) {
        
    } else if (note == 77) {
        
    } else if (note == 78) {
        
    } else if (note == 79) {
        
    } else if (note == 80) {
        
    } else if (note == 81) {
        
    } else if (note == 82) {
        
    } else if (note == 83) {
        
    } else if (note == 84) {
        
    } else if (note == 85) {
        
    } else if (note == 86) {
        
    } else if (note == 87) {
        
    } else if (note == 89) {
        
    } else if (note == 90) {
        
    } else if (note == 91) {
        
    } else if (note == 92) {
        
    } else if (note == 93) {
        
    } else if (note == 94) {
        
    } else if (note == 95) {
        
    } else if (note == 96) {
        
    } else if (note == 97) {
        
    } else if (note == 98) {
        
    } else {
        
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

