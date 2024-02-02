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

if ("geolocation" in navigator) {
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        if (result.state === 'granted') {
            // Permission already granted, proceed with geolocation
            console.log("Geolocation permission granted");

            // Request current position
            navigator.geolocation.getCurrentPosition(success, error);
        } else if (result.state === 'prompt') {
            // Permission not yet granted, prompt the user
            console.log("Geolocation permission not granted, requesting permission...");
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            // Permission denied or unavailable
            console.log("Geolocation permission denied or unavailable");
        }
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
