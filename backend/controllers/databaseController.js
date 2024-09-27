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
        if (err) {
            return res.status(500).json({ message: 'Erreur de connexion.' });
        } else {
            dbConnections.push({ dbType, connection });
            res.status(200).json({ message: 'BDD enregistré avec succès' });
            var connectionToMainDb = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "root",
                database: 'safebase'
            });
        
            connectionToMainDb.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                var sql = `INSERT INTO all_databases (host, user, password, db_name, db_type) 
                VALUES ('${host}', '${user}', '${password}', '${database}', '${dbType}')`;
                console.log(sql);
                connectionToMainDb.query(sql, function (err, result) {
                  if (err) throw err;
                  console.log("1 record inserted");
                });
            });
        }
    });
};



module.exports = { addDatabase };