

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
            changeDisplay(resp)
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

console.log(navigator);
let device;

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
    // console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);
    const inputs = midiAccess.inputs;
    // console.log(inputs);

    for (let output of midiAccess.outputs.values()) {
        device = output;
        console.log('Output device selected', device);
    }


    inputs.forEach((inp) => {
        inp.addEventListener('midimessage', handleInput);
    });
}

function handleInput(input) {
    // console.log(input)
    let command = input.data[0];
    let note = input.data[1];
    let velocity = input.data[2];

    let data = input.data;

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
    
    // changeBackground(note)
}

function noteOff(note) {
    console.log(`note: ${note} // off`);

    if (note < 52) {
        addLongitude(10);
        makeApiCall();
        colorM(36,0);
        colorM(37,0);
        colorM(38,0);
        colorM(39,0);
        colorM(40,0);
        colorM(41,0);
        colorM(42,0);
        colorM(43,0);
        colorM(44,0);
        colorM(45,0);
        colorM(46,0);
        colorM(47,0);
        colorM(48,0);
        colorM(49,0);
        colorM(50,0);
        colorM(51,0);
    } else if (note > 51 && note < 68) {
        subLongitude(10)
        makeApiCall();
        colorM(52,0);
        colorM(53,0);
        colorM(54,0);
        colorM(55,0);
        colorM(56,0);
        colorM(57,0);
        colorM(58,0);
        colorM(59,0);
        colorM(60,0);
        colorM(61,0);
        colorM(62,0);
        colorM(63,0);
        colorM(64,0);
        colorM(65,0);
        colorM(66,0);
        colorM(67,0);
    } else if (note > 68 && note < 84) {
        addLat(10);
        makeApiCall();
        colorM(68,0);
        colorM(69,0);
        colorM(70,0);
        colorM(71,0);
        colorM(72,0);
        colorM(73,0);
        colorM(74,0);
        colorM(75,0);
        colorM(76,0);
        colorM(77,0);
        colorM(78,0);
        colorM(79,0);
        colorM(80,0);
        colorM(81,0);
        colorM(82,0);
        colorM(83,0);       
    } else {
        subLat(10);
        makeApiCall();
        colorM(84,0);
        colorM(85,0);
        colorM(86,0);
        colorM(86,0);
        colorM(87,0);
        colorM(88,0);
        colorM(89,0);
        colorM(90,0);
        colorM(91,0);
        colorM(92,0);
        colorM(93,0);
        colorM(94,0);
        colorM(95,0);
        colorM(96,0);
        colorM(97,0);
        colorM(98,0);
        colorM(99,0);
    }


}

function changeBackground(note) {
    if (note <= 51) {
        document.body.style.backgroundColor = "yellow";
        colorM(36,124);
        colorM(37,124);
        colorM(38,124);
        colorM(39,124);
        colorM(40,124);
        colorM(41,124);
        colorM(42,124);
        colorM(43,124);
        colorM(44,124);
        colorM(45,124);
        colorM(46,124);
        colorM(47,124);
        colorM(48,124);
        colorM(49,124);
        colorM(50,124);
        colorM(51,124);
    } else if (note >= 52 && note <= 67) {
        document.body.style.backgroundColor = "red";
        colorM(52,5);
        colorM(53,5);
        colorM(54,5);
        colorM(55,5);
        colorM(56,5);
        colorM(57,5);
        colorM(58,5);
        colorM(59,5);
        colorM(60,5);
        colorM(61,5);
        colorM(62,5);
        colorM(63,5);
        colorM(64,5);
        colorM(65,5);
        colorM(66,5);
        colorM(67,5);
    } else if (note >= 84 && note <= 99) {
        document.body.style.backgroundColor = "dodgerblue";
        colorM(84,79);
        colorM(85,79);
        colorM(86,79);
        colorM(86,79);
        colorM(87,79);
        colorM(88,79);
        colorM(89,79);
        colorM(90,79);
        colorM(91,79);
        colorM(92,79);
        colorM(93,79);
        colorM(94,79);
        colorM(95,79);
        colorM(96,79);
        colorM(97,79);
        colorM(98,79);
        colorM(99,79);             
    } else if (note >= 68 && note <= 83) {
        document.body.style.backgroundColor = "lightgreen";
        colorM(68,123);
        colorM(69,123);
        colorM(70,123);
        colorM(71,123);
        colorM(72,123);
        colorM(73,123);
        colorM(74,123);
        colorM(75,123);
        colorM(76,123);
        colorM(77,123);
        colorM(78,123);
        colorM(79,123);
        colorM(80,123);
        colorM(81,123);
        colorM(82,123);
        colorM(83,123); 
    }
}

function colorM(key, clr) {
    device && device.send([0x90,key,clr]); // note on
}



// function sweep(key)