import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackupRestore = () => {
  const [dbType, setDbType] = useState('mysql');
  const [dbName, setDbName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('backup');
  const [backups, setBackups] = useState([]);
  const [selectedBackup, setSelectedBackup] = useState(''); 

  useEffect(() => {
    if (action === 'restore') {
      axios.get('/backups')
        .then(response => {
          setBackups(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des sauvegardes', error);
        });
    }
  }, [action]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = '';
      let data = {
        dbName,
        user,
        password,
        dbType
      };

      if (action === 'backup') {
        url = `/backup/${dbType}`;
      } else {
        url = `/restore/${dbType}`;
        data.fileName = selectedBackup;
      }

      const response = await axios.post(url, data);

      alert(response.data);
    } catch (error) {
      alert('Erreur lors de l\'opération');
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100">
      <div className="w-1/2 m-5">
        <h2 className="text-2xl font-bold text-center mb-4">{action === 'backup' ? 'Sauvegarder une base de données' : 'Restaurer une base de données'}</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de base de données :</label>
            <select
              value={dbType}
              onChange={(e) => setDbType(e.target.value)}
              className="block w-1/2 px-3 bg-blue-100 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="mysql">MySQL</option>
              <option value="postgres">PostgreSQL</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la base de données :</label>
            <input
              type="text"
              name='database'
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              required
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Utilisateur :</label>
            <input
              type="text"
              name='user'
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe :</label>
            <input
              type="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">Action :</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="block w-1/2 px-3 py-2 border bg-blue-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="backup">Sauvegarde</option>
              <option value="restore">Restauration</option>
            </select>
          </div>

          {action === 'restore' && (
            <div className="flex flex-col items-center ">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner une sauvegarde :</label>
              <select
                value={selectedBackup}
                onChange={(e) => setSelectedBackup(e.target.value)}
                required
                className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Choisir une sauvegarde</option>
                {backups.map((backup, index) => (
                  <option key={index} value={backup}>{backup}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-800 text-white py-1 px-3 rounded-md shadow hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 text-sm"
            >
              {action === 'backup' ? 'Sauvegarder' : 'Restaurer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BackupRestore;
