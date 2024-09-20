const mysql = require('mysql2');
const pg = require('pg');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'root'
});

const insertDatabase = async (req, res) => {
    let tableName = req.body.tableName;
    let columns = req.body.columns;
    let values = req.body.values;

    if(columns.length !== values.length) {
        res.status(400).json({ error: 'il doit avoir autant de colonnes que de valeurs'});
    }

    const columnsList = columns.join(', ');
    const valuesList = values.map(() => '?').join(', ')

    const query = `INSERT INTO ${tableName} (${columnsList}) VALUES (${valuesList})`;

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion des données :", err);
            return res.status(500).json({ error: "Erreur lors de l'insertion des données" });
        }
        res.status(200).json({ message: "Données bien insérées", data: result });
    });

}

module.exports = insertDatabase;