const express = require('express');
const app = express();
const dbRoutes = require('./routes/databaseRoutes');
const dbController = require('./controllers/databaseController');
const bodyParser = require('body-parser');
const backupRoutes = require('./routes/backupRoutes');

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/databases', dbRoutes);
app.use('/', backupRoutes);

// SafeBase
app.get('/', (req, res) => {
    res.send('SafeBase');
});

module.exports = app;