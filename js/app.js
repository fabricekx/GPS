let start = false;
let watchId; // Variable to store the watch position ID

function success(position) {
    // Retrieve latitude and longitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(position);

    // Update position HTML element
    document.getElementById("position").innerHTML = `<div class="container alert alert-primary">Latitude: ${latitude} Longitude: ${longitude}</div>`;

    // Check if speed is available
    if (position.coords.speed !== null) {
        // Retrieve speed en km/h (*3.6)
        // const speed = position.coords.speed.toFixed(2) * 3.6;
        const speed =3
        // Update speed HTML element
        if (unit == "km/h") {
            document.getElementById("speed").innerHTML = `<div class="container d-flex alert alert-primary" >
            <div>Vitesse: ${speed} </div>
             <div id="unit"><select  class="form-select" aria-label="">
            <option selected value="km/h" >km/h</option>
            <option  value="noeuds">noeuds</option>
            </select>
            </div>
            </div>`;
            start = true
        } else {

            document.getElementById("speed").innerHTML = `<div class="container d-flex alert alert-primary" >
            <div>Vitesse: ${speed * 0.539957} </div>
             <div id="unit"><select  class="form-select" aria-label="">
            <option value="km/h" >km/h</option>
            <option selected value="noeuds">noeuds</option>
            </select>
            </div>
            </div>`;
        start=true
        }
    } else {
        // Update speed HTML element if speed information is not available
        document.getElementById("speed").innerHTML = '<div class="container alert alert-danger">Vitesse non disponible';
    }

    if (position.coords.heading !== null) {
        // Retrieve heading
        const heading = position.coords.heading.toFixed(0);

        // Update heading HTML element
        document.getElementById("heading").innerHTML = `<div class="container alert alert-primary">Cap: ${heading} degrees </div>`;
    } else {
        // Update heading HTML element if heading information is not available
        document.getElementById("heading").innerHTML = '<div class="container alert alert-danger">Cap non disponible.</div>';
    }
}

function error(error) {
    console.error(`Error getting geolocation: ${error.message}`);
}

function startTracking() {
    if ("geolocation" in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
            if (result.state === 'granted') {
                // Permission already granted, proceed with geolocation
                console.log("Geolocation permission granted <br>");

                // Start watching for changes in position
                watchId = navigator.geolocation.watchPosition(success, error);
            } else if (result.state === 'prompt') {
                // Permission not yet granted, prompt the user
                console.log("Geolocation permission not granted, requesting permission...");
                watchId = navigator.geolocation.watchPosition(success, error);
            } else {
                // Permission denied or unavailable
                console.log("Geolocation permission denied or unavailable");
            }
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function pauseTracking() {
    // Stop watching for position updates
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        console.log("Geolocation tracking paused");
    }
};


// Button click event listener to start tracking
document.getElementById("startTracking").addEventListener("click", startTracking);

// Button click event listener to pause tracking
document.getElementById("pauseTracking").addEventListener("click", pauseTracking);

if (start==true) {
var e = document.getElementById("unit");
e.addEventListener("onchange", changeUnit);};
function changeUnit() {var unit = e.value; return unit};



