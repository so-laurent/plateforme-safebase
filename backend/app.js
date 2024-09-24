const express = require('express');
const app = express();
const dbRoutes = require('./routes/databaseRoutes');
const bodyParser = require('body-parser');
const backupRoutes = require('./routes/backupRoutes');
const cron = require('node-cron');
const path = require('path');
const { exec } = require('child_process');

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/databases', dbRoutes);
app.use('/', backupRoutes);
app.use(express.urlencoded({ extended: true }));

// SafeBase
app.get('/', (req, res) => {
    res.send('SafeBase');
});

// Fonction pour sauvegarder MySQL
const backupMySQL = async (dbName, user, password, host) => {
    
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
      }

      console.error(`stderr: ${stderr}`); 
      console.log(`stdout: ${stdout}`);   
      console.log(`Sauvegarde MySQL réussie : ${backupPath}`);
    });
  };
  
  // Fonction pour sauvegarder PostgreSQL
  const backupPostgreSQL = (dbName, user, password, host) => {
    const now = new Date();
    const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
  
    const backupPath = path.join(__dirname, `./backups/${dbName}_postgresql_backup_${time}.sql`);
  
    // Commande pour pg_dump (PostgreSQL)
    const backupCommand = `PGPASSWORD=${password} pg_dump -h ${host} -U ${user} -F c ${dbName} > ${backupPath}`;
  
    exec(backupCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de la sauvegarde PostgreSQL: ${error}`);
        return;
      }
      console.log(`Sauvegarde PostgreSQL réussie : ${backupPath}`);
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
        backupMySQL(dbName, user, password, host);
      });
    } else if (dbType === 'postgresql') {
      cron.schedule(cronPattern, () => {
        console.log(`Démarrage de la sauvegarde PostgreSQL pour ${dbName}...`);
        backupPostgreSQL(dbName, user, password, host);
      });
    } else {
      return res.status(400).send('Type de base de données non pris en charge.');
    }
  
    res.status(200).send('Tâche cron créée avec succès.');
  });

module.exports = app;