import React from "react";

const CronForm = () => {
return (
    <>
        <h1>Programmer des sauvegardes régulières</h1>
        <form id="cronForm" method="POST" action="/create-cron">
            <label for="dbType">Type de base de données:</label>
            <select id="dbType" name="dbType" required>
                <option value="mysql">MySQL</option>
                <option value="postgresql">PostgreSQL</option>
            </select> <br></br>

            <label for="dbName">Nom de la base de données:</label>
            <input type="text" id="dbName" name="dbName" required /> <br></br>

            <label for="user">Utilisateur de la base de données:</label>
            <input type="text" id="user" name="user" required /> <br></br>

            <label for="password">Mot de passe de la base de données:</label>
            <input type="password" id="password" name="password" required /> <br></br>

            <label for="host">Hôte de la base de données:</label>
            <input type="text" id="host" name="host" required /> <br></br>

            <label for="frequency">Fréquence:</label>
            <select id="frequency" name="frequency" required>
                <option value="hourly">Toutes les heures</option>
                <option value="daily">Tous les jours à minuit</option>
                <option value="weekly">Toutes les semaines</option>
                <option value="monthly">Tous les mois</option>
            </select> <br></br>

            <input type="submit" value="Créer la tâche Cron"/>
        </form>
    </>
)
}

export default CronForm;