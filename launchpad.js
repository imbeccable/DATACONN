let raindrops = []
let resp;

console.log(navigator);
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

    if (note < 52) {
        addLongitude(10);
        makeApiCall();
    } else if (note > 51 && note < 68) {
        subLongitude(10)
        makeApiCall();
    } else if (note > 68 && note < 84) {
        addLat(10);
        makeApiCall();     
    } else {
        subLat(10);
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
    i=0;
    for (i;i<dew;i+5) {
        console.log("works")
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

