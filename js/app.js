let watchId; // Variable to store the watch position ID
let unit = "";

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
        const kmh = (position.coords.speed*3.6).toFixed(1) ;
// const kmh=3;
const noeuds= (0.539957*kmh).toFixed(1)
        console.log(unit);

        // Update speed HTML element
        if (unit == "km/h") {
            document.getElementById("speed").innerHTML = `<div class="container d-flex alert alert-primary" >
            <div>Vitesse: ${kmh} </div>
             <div ><select id="unit" class="form-select" aria-label="">
            <option selected value="km/h" >km/h</option>
            <option  value="noeuds">noeuds</option>
            </select>
            </div>
            </div>`;
            var e = document.getElementById("unit");
            e.addEventListener("change", (event) => {
                unit = event.target.value;
                success(position);
                console.log("unit ="+unit);
            });
        } else {

            document.getElementById("speed").innerHTML = `<div class="container d-flex alert alert-primary" >
            <div>Vitesse: ${noeuds} </div>
             <div ><select id="unit" class="form-select" aria-label="">
            <option value="km/h" >km/h</option>
            <option selected value="noeuds">noeuds</option>
            </select>
            </div>
            </div>`;
            var e = document.getElementById("unit");
    e.addEventListener("change", (event) => {
        unit = event.target.value;
        success(position);
        console.log("unit ="+unit);
    });

        }
    } else {
        // Update speed HTML element if speed information is not available
        document.getElementById("speed").innerHTML = '<div class="container alert alert-danger">Vitesse non disponible';
    }

    if (position.coords.heading !== null) {
        // Retrieve heading
        const heading = position.coords.heading.toFixed(0);
// const heading = 3
        // Update heading HTML element
        document.getElementById("heading").innerHTML = `<div class="container d-flex alert alert-primary">
        <div>Cap: ${heading} degrees </div>
        <button class="btn btn-success" id="startPilot">Start Pilot</button>
        <div id="askedHeading"></div>`;
        document.getElementById("startPilot").addEventListener("click", startPilot(heading));

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



function startPilot(cap) {
    // console.log(cap);
    document.getElementById("askedHeading").innerHTML = `asked Heading = ${cap}`;
}

