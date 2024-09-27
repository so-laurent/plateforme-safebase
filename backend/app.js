const express = require('express');
const app = express();
const dbRoutes = require('./routes/databaseRoutes');
const bodyParser = require('body-parser');
const backupRoutes = require('./routes/backupRoutes');
const cron = require('node-cron');
const path = require('path');
const { exec } = require('child_process');
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/databases', dbRoutes);
app.use('/', backupRoutes);
app.use(express.urlencoded({ extended: true }));

// SafeBase
app.get('/', (req, res) => {
    res.send('SafeBase');
});

app.use('/backups', express.static(path.join(__dirname, 'backups')));

// Fonction pour sauvegarder MySQL
const backupMySQL = async (dbName, user, password, host, frequency, cronPattern) => {
    
    const now = new Date();
    const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
    const backupPath = path.join(__dirname, `./backups/${dbName}_mysql_backup_${time}.sql`);

    const backupCommand = `mysqldump -h ${host} -u ${user} -p${password} ${dbName} > ${backupPath}`;
    //console.log(`Commande de sauvegarde : ${backupCommand}`);
  
    await exec(backupCommand, (error, stdout, stderr) => {
      console.log('exec');
      if (error) {
        console.error(`Erreur lors de la sauvegarde MySQL: ${error.message}`);
        console.error(`stderr: ${stderr}`); 
        console.log(`stdout: ${stdout}`);   
        return;
      } else {  
        console.log(`Sauvegarde MySQL réussie : ${backupPath}`);
        var connectionToMainDb = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          database: 'safebase'
        });
      
        connectionToMainDb.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = `INSERT INTO cron (db_name, host, user, frequency, db_type, status, pattern) 
          VALUES ('${dbName}', '${host}', '${user}', '${frequency}', 'mysql', 'active', '${cronPattern}')`;
          console.log(sql);
          connectionToMainDb.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        });
      }
    });
  };
  
  // Fonction pour sauvegarder PostgreSQL
  const backupPostgreSQL = (dbName, user, password, host, frequency, cronPattern) => {
    const now = new Date();
    const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
  
    const backupPath = path.join(__dirname, `./backups/${dbName}_postgresql_backup_${time}.sql`);
  
    // Commande pour pg_dump (PostgreSQL)
    const backupCommand = `PGPASSWORD=${password} pg_dump -h ${host} -U ${user} -F c ${dbName} > ${backupPath}`;
  
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de la sauvegarde PostgreSQL: ${error}`);
        return;
      } else {
        var connectionToMainDb = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          database: 'safebase'
        });
      
        connectionToMainDb.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = `INSERT INTO cron (db_name, host, user, frequency, db_type, status, pattern) 
          VALUES ('${dbName}', '${host}', '${user}', '${frequency}', 'postgresql', 'active', '${cronPattern}')`;
          console.log(sql);
          connectionToMainDb.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        });
      }
    });
  };
  
  app.post('/create-cron', (req, res) => {
    const { dbType, dbName, user, password, host, frequency } = req.body;
  
    if (!dbType || !dbName || !user || !password || !host || !frequency) {
      return res.status(400).send('Tous les champs sont obligatoires.');
    }
  
    let cronPattern;
    switch (frequency) {
      case 'hourly':
        cronPattern = '* * * * *';
        break;
      case 'daily':
        cronPattern = '0 0 * * *';
        break;
      case 'weekly':
        cronPattern = '0 0 * * 0';
        break;
      case 'monthly':
        cronPattern = '0 0 1 * *'; 
        break;
      default:
        return res.status(400).send('Fréquence invalide.');
    }
  
    if (dbType === 'mysql') {
      cron.schedule(cronPattern, () => {
        console.log(`Démarrage de la sauvegarde MySQL pour ${dbName}...`);
        backupMySQL(dbName, user, password, host, frequency, cronPattern);
      });
    } else if (dbType === 'postgresql') {
      cron.schedule(cronPattern, () => {
        console.log(`Démarrage de la sauvegarde PostgreSQL pour ${dbName}...`);
        backupPostgreSQL(dbName, user, password, host, frequency, cronPattern);
      });
    } else {
      return res.status(400).send('Type de base de données non pris en charge.');
    }
  
    res.status(200).send('Tâche cron créée avec succès.');
  });

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'safebase'
  })

  db.connect(err => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err);
      return;
    }
    console.log('Connecté à la base de données');
  });

  app.get('/my-databases', (req, res) => {
    db.query('SELECT * FROM all_databases WHERE state = 1', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  app.get('/my-backups', (req, res) => {
    db.query('SELECT * FROM backups', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  app.get('/my-actions', (req, res) => {
    db.query('SELECT * FROM actions', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  app.get('/my-crons', (req, res) => {
    db.query('SELECT * FROM cron', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  app.delete('/delete-db/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('UPDATE all_databases SET state = 0 WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
        res.json({ message: 'Database marked as deleted', results });
    });
  });
  
  // UPDATE table SET nom_colonne_1 = 'nouvelle valeur' WHERE condition


module.exports = app;