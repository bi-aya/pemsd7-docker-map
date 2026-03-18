// Initialisation de la carte, centrée précisément sur Los Angeles
const map = L.map('map').setView([34.0522, -118.2437], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Récupération données depuis le backend
fetch('http://localhost:5000/api/stations')
    .then(response => response.json())
    .then(stations => {
        document.getElementById('status').innerText = `${stations.length} stations chargées.`;
        
        stations.forEach(station => {
            const lat = parseFloat(station.Latitude);
            const lon = parseFloat(station.Longitude);
            
            if (!isNaN(lat) && !isNaN(lon)) {
                L.marker([lat, lon])
                 .addTo(map)
                 .bindPopup(`<b>Station ID:</b> ${station.ID || 'N/A'} <br> 
                             <b>Freeway:</b> ${station.Fwy || 'N/A'} <br>
                             <b>Direction:</b> ${station.Dir || 'N/A'} <br>
                             <b>Latitude:</b> ${station.Latitude || 'N/A'} <br>
                             <b>Longitude:</b> ${station.Longitude || 'N/A'}`); 
            }
        });
    })
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('status').innerText = 'Erreur lors du chargement des données.';
    });