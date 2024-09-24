const mysql = require('mysql2');
const pg = require('pg');

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

/*

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
        
        // Si la connexion est réussie, stocker dans la base de données principale
        const query = `INSERT INTO all_databases (host, user, password, db_name, db_type)
        VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        const values = [host, user, password, database, dbType];

        mainDbClient.query(query, values, (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Erreur lors de l\'insertion dans la base de données.' });
            }

            dbConnections.push({ dbType, connection });
            res.status(200).json({ message: 'Connexion ajoutée avec succès et stockée en BDD.' });
        });
    });
};

*/

module.exports = { addDatabase };