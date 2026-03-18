const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://mongodb:27017/pemsd7', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connecté à MongoDB');
    initDatabase();
})
.catch(err => console.error('Erreur de connexion MongoDB:', err));

const StationSchema = new mongoose.Schema({}, { strict: false });
const Station = mongoose.model('Station', StationSchema);

async function initDatabase() {
    const count = await Station.countDocuments();
    if (count === 0) {
        console.log('Base de données vide. Ingestion du CSV en cours...');
        const results = [];
        
        fs.createReadStream('/app/data/PeMSD7_M_Station_Info.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    await Station.insertMany(results);
                    console.log(`${results.length} stations insérées avec succès.`);
                } catch (error) {
                    console.error('Erreur lors de l\'insertion:', error);
                }
            });
    } else {
        console.log(`Les données existent déjà (${count} stations).`);
    }
}

app.get('/api/stations', async (req, res) => {
    try {
        const stations = await Station.find({});
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(5000, () => console.log('Backend démarré sur le port 5000'));