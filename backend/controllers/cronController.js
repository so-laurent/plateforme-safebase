const cron = require('node-cron');
const { backupMySQL } = require('./backupController');

const cronController = {
    startCron: () => {
        cron.schedule('38 16 * * *', () => {
            console.log('le cron est éxécuté tous les jours à ...');
            backupMySQL();
        });
        console.log('le cron a été démarré');
    }
}

module.exports = cronController;