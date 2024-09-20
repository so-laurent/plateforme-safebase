import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddDatabase.css';


const AddDatabase = () => {
  const [formData, setFormData] = useState({
    dbType: 'mysql',
    host: '',
    user: '',
    password: '',
    database: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/databases/add', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Erreur lors de l\'ajout de la connexion.');
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100">
      <div className="w-1/2 m-5">
        <h2 className="text-2xl font-bold text-center mb-4">Ajouter une Base de Données</h2> {/* Titre ajouté */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hôte</label>
            <input
              type="text"
              placeholder="Hôte"
              value={formData.host}
              onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Utilisateur</label>
            <input
              type="text"
              placeholder="Utilisateur"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Base de données</label>
            <input
              type="text"
              placeholder="Base de données"
              value={formData.database}
              onChange={(e) => setFormData({ ...formData, database: e.target.value })}
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-800 text-white py-1 px-3 rounded-md shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 text-sm"
            >
              Ajouter la connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDatabase;
