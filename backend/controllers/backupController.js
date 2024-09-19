const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const listBackups = (req, res) => {
  const backupsDir = path.join(__dirname, '../backups');

  fs.readdir(backupsDir, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du dossier des sauvegardes', err);
      return res.status(500).send('Erreur lors de la récupération des sauvegardes');
    }

    const sqlFiles = files.filter(file => file.endsWith('.sql')); // Filtrer les fichiers .sql
    res.status(200).json(sqlFiles);
  });
};

const backupMySQL = (req, res) => {
  const { dbName, user, password } = req.body;
  const now = new Date();
  const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;

  const backupPath = path.join(__dirname, `../backups/${dbName}_backup_${time}.sql`);

  const backupCommand = `mysqldump -u ${user} -p${password} ${dbName} > ${backupPath}`;

  exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la sauvegarde MySQL: ${error}`);
      res.status(500).send('Erreur lors de la sauvegarde MySQL');
      return;
    }
    res.status(200).send(`Sauvegarde MySQL réussie : ${backupPath}`);
  });
};

// Sauvegarder la base de données PostgreSQL
const backupPostgres = (req, res) => {
  const { dbName, user, password } = req.body;
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;

  const backupPath = path.join(__dirname, `../backups/${dbName}_backup_${timestamp}.sql`);

  const backupCommand = `PGPASSWORD=${password} pg_dump -U ${user} -d ${dbName} > ${backupPath}`;

  exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la sauvegarde PostgreSQL: ${error}`);
      res.status(500).send('Erreur lors de la sauvegarde PostgreSQL');
      return;
    }
    res.status(200).send(`Sauvegarde PostgreSQL réussie : ${backupPath}`);
  });
};

// Restauration MySQL
const restoreMySQL = (req, res) => {
  const { dbName, user, password, fileName } = req.body;

  if (!fileName) {
    return res.status(400).send('Nom du fichier de sauvegarde manquant');
  }

  const backupPath = path.join(__dirname, `../backups/${fileName}`);

  const restoreCommand = `mysql -u ${user} -p${password} ${dbName} < ${backupPath}`;

  exec(restoreCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la restauration MySQL: ${error}`);
      res.status(500).send('Erreur lors de la restauration MySQL');
      return;
    }
    res.status(200).send('Restauration MySQL réussie');
  });
};

// Restauration PostgreSQL
const restorePostgres = (req, res) => {
  const { dbName, user, password, fileName } = req.body;

  if (!fileName) {
    return res.status(400).send('Nom du fichier de sauvegarde manquant');
  }

  const backupPath = path.join(__dirname, `../backups/${fileName}`);

  const restoreCommand = `PGPASSWORD=${password} psql -U ${user} -d ${dbName} -f ${backupPath}`;

  exec(restoreCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la restauration PostgreSQL: ${error}`);
      res.status(500).send('Erreur lors de la restauration PostgreSQL');
      return;
    }
    res.status(200).send('Restauration PostgreSQL réussie');
  });
};

module.exports = {
  listBackups,
  backupMySQL,
  backupPostgres,
  restoreMySQL,
  restorePostgres
};