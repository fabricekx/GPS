let watchId; // Variable to store the watch position ID

function success(position) {
    // Retrieve latitude and longitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(position);

    // Update position HTML element
    document.getElementById("position").innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;

    // Check if speed is available
    if (position.coords.speed !== null) {
        // Retrieve speed
        const speed = position.coords.speed;

        // Update speed HTML element
        document.getElementById("speed").innerHTML = `Speed: ${speed} meters per second`;
    } else {
        // Update speed HTML element if speed information is not available
        document.getElementById("speed").innerHTML = 'Speed information not available.';
    }

    if (position.coords.heading !== null) {
        // Retrieve heading
        const heading = position.coords.heading;

        // Update heading HTML element
        document.getElementById("heading").innerHTML = `Heading: ${heading} degrees`;
    } else {
        // Update heading HTML element if heading information is not available
        document.getElementById("heading").innerHTML = 'Heading information not available.';
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
                console.log("Geolocation permission granted");

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
}

// Button click event listener to start tracking
document.getElementById("startTracking").addEventListener("click", startTracking);

// Button click event listener to pause tracking
document.getElementById("pauseTracking").addEventListener("click", pauseTracking);