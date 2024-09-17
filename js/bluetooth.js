// Fonction pour se connecter à un périphérique Bluetooth en utilisant son adresse MAC
async function connectToDevice() {
    try {
        // Adresse MAC du périphérique Bluetooth
        const deviceMacAddress = 'C8:8C:08:05:10:55'; // Remplacer par l'adresse MAC de votre périphérique

        // Recherche du périphérique Bluetooth par son adresse MAC
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ name: deviceMacAddress }] // Utilisation du filtre pour rechercher par adresse MAC
        });

        // Connexion au périphérique sélectionné
        const server = await device.gatt.connect();

        // Obtention du service du relais Bluetooth (remplacer 'bluetooth_service_uuid' par l'UUID du service si nécessaire)
        const service = await server.getPrimaryService('bluetooth_service_uuid');

        // Effectuer d'autres opérations, comme lire/écrire des caractéristiques, définir des écouteurs d'événements, etc.
        // Exemple : const characteristic = await service.getCharacteristic('characteristic_uuid');

        console.log('Connecté au périphérique Bluetooth');
    } catch (error) {
        console.error('Erreur lors de la connexion au périphérique Bluetooth :', error);
    }
}

// Appel de la fonction pour se connecter au périphérique Bluetooth lors d'un événement, par exemple, un clic sur un bouton
document.getElementById('connectButton').addEventListener('click', connectToDevice);
