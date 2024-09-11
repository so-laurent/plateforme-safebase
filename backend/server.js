const app = require('./app');
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Le serveur Express est lancé sur le port ${PORT}`);
});