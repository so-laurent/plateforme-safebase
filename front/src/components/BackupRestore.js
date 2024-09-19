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
        password
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
    <div>
      <h2>{action === 'backup' ? 'Sauvegarder une base de données' : 'Restaurer une base de données'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type de base de données :</label>
          <select value={dbType} onChange={(e) => setDbType(e.target.value)}>
            <option value="mysql">MySQL</option>
            <option value="postgres">PostgreSQL</option>
          </select>
        </div>
        <div>
          <label>Nom de la base de données :</label>
          <input type="text" value={dbName} onChange={(e) => setDbName(e.target.value)} required />
        </div>
        <div>
          <label>Utilisateur :</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Action :</label>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="backup">Sauvegarde</option>
            <option value="restore">Restauration</option>
          </select>
        </div>
        {action === 'restore' && (
          <div>
            <label>Sélectionner une sauvegarde :</label>
            <select value={selectedBackup} onChange={(e) => setSelectedBackup(e.target.value)} required>
              <option value="">Choisir une sauvegarde</option>
              {backups.map((backup, index) => (
                <option key={index} value={backup}>{backup}</option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">{action === 'backup' ? 'Sauvegarder' : 'Restaurer'}</button>
      </form>
    </div>
  );
};

export default BackupRestore;