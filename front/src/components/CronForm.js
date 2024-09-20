import React from "react";

const CronForm = () => {
  return (
    <div className="flex justify-center items-start bg-gray-100">
      <div className="w-1/2 m-5">
        <h2 className="text-2xl font-bold text-center mb-4">Programmer des sauvegardes régulières</h2>
        <form id="cronForm" method="POST" action="/create-cron" className="bg-white p-6 rounded shadow-md space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="dbType" className="block text-sm font-medium text-gray-700 mb-1">Type de base de données:</label>
            <select
              id="dbType"
              name="dbType"
              required
              className="block w-1/2 px-3 py-2 border bg-blue-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="mysql">MySQL</option>
              <option value="postgresql">PostgreSQL</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="dbName" className="block text-sm font-medium text-gray-700 mb-1">Nom de la base de données:</label>
            <input
              type="text"
              id="dbName"
              name="dbName"
              required
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">Utilisateur de la base de données:</label>
            <input
              type="text"
              id="user"
              name="user"
              required
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe de la base de données:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-1">Hôte de la base de données:</label>
            <input
              type="text"
              id="host"
              name="host"
              required
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Fréquence:</label>
            <select
              id="frequency"
              name="frequency"
              required
              className="block w-1/2 px-3 py-2 border bg-blue-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="hourly">Toutes les heures</option>
              <option value="daily">Tous les jours à minuit</option>
              <option value="weekly">Toutes les semaines</option>
              <option value="monthly">Tous les mois</option>
            </select>
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Créer la tâche Cron"
              className="bg-gray-800 text-white py-1 px-3 rounded-md shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CronForm;
