const mysql = require('mysql2');
const pg = require('pg');
const insertDatabase = require('../controllers/insertDatabaseController');

let dbConnections = [];

const addDatabase = (req, res) => {
    const { dbType, host, user, password, database } = req.body;

    let connection;
    if (dbType === 'mysql') {
        connection = mysql.createConnection({ host, user, password, database });
    } else if (dbType === 'postgres') {
        connection = new pg.Client({ host, user, password, database });
    } else {
        return res.status(400).json({ message: 'Type de base de données non pris en compte' });
    }

    connection.connect(err => {
        if (err) return res.status(500).json({ message: 'Erreur de connexion.' });
        dbConnections.push({ dbType, connection });
        res.status(200).json({ message: 'Connexion ajoutée avec succès.' });
    });
};
const insertData = (req, res) => {
    const { dbType, host, user, password, database } = req.body;
    const tableName = 'all_databases';

    insertDatabase(req, res);

}

module.exports = { addDatabase };