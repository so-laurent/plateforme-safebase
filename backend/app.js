const express = require('express');
const app = express();
const dbRoutes = require('./routes/databaseRoutes');
const dbController = require('./controllers/databaseController');

// Middleware pour analyser les données JSON
app.use(express.json());
app.use('/api/databases', dbRoutes);

// Route de test
app.get('/', (req, res) => {
    res.send('SafeBase');
});



module.exports = app;