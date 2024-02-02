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
        // Retrieve speed
        const heading= position.coords.heading;

        // Update speed HTML element
        document.getElementById("heading").innerHTML = `Cap: ${heading} deg`;
    } else {
        // Update heading HTML element if heading information is not available
        document.getElementById("heading").innerHTML = 'heading  not available.';
    }
}

function error(error) {
    console.error(`Error getting geolocation: ${error.message}`);
}

// Button click event listener to start geolocation
document.getElementById("startGeolocation").addEventListener("click", function() {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
        // Watch for changes in geolocation
        const watchId = navigator.geolocation.watchPosition(success, error);
        // To stop watching position updates, you can use:
        // navigator.geolocation.clearWatch(watchId);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});
