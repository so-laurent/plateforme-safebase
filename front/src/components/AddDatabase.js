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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Hôte"
        value={formData.host}
        onChange={(e) => setFormData({ ...formData, host: e.target.value })}
      />
      <br></br>
      <input
        type="text"
        placeholder="Utilisateur"
        value={formData.user}
        onChange={(e) => setFormData({ ...formData, user: e.target.value })}
      />
      <br></br>
      <input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <br></br>
      <input
        type="text"
        placeholder="Base de données"
        value={formData.database}
        onChange={(e) => setFormData({ ...formData, database: e.target.value })}
      />
      <br></br>
      <button type="submit">Ajouter la connexion</button>
    </form>
  );
};

export default AddDatabase;