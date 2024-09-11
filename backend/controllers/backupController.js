const { exec } = require('child_process');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, 'backups');
const USER = 'root';
const PASSWORD = 'monmotdepasse';
const DATABASE = 'ma_base';

const backupDatabase = (req, res) => {
  const date = new Date().toISOString().replace(/:/g, '-');
  const backupFile = `${BACKUP_DIR}/${DATABASE}_backup_${date}.sql`;

  exec(`mysqldump -u ${USER} -p${PASSWORD} ${DATABASE} > ${backupFile}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de la sauvegarde : ${error}`);
      return res.status(500).json({ message: 'Erreur lors de la sauvegarde' });
    }
    console.log(`Sauvegarde réussie : ${backupFile}`);
    res.status(200).json({ message: 'Sauvegarde réussie', file: backupFile });
  });
};

module.exports = { backupDatabase };
