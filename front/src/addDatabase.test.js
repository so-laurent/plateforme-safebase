import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AddDatabase from './components/AddDatabase';

// Mock axios
jest.mock('axios');

describe('AddDatabase Component', () => {
  
  // Test unitaire 1 : Vérifie que le composant se rend correctement
  test('devrait afficher le titre et le formulaire', () => {
    render(<AddDatabase />);

    expect(screen.getByText(/Ajouter une Base de Données/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Hôte/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Utilisateur/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Base de données/i)).toBeInTheDocument();
  });

  // Test unitaire 2 : Vérifie que le formulaire est soumis correctement
  test('devrait soumettre le formulaire et afficher une alerte', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Connexion ajoutée avec succès.' } });

    render(<AddDatabase />);

    fireEvent.change(screen.getByPlaceholderText(/Hôte/i), { target: { value: 'localhost' } });
    fireEvent.change(screen.getByPlaceholderText(/Utilisateur/i), { target: { value: 'root' } });
    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), { target: { value: 'root' } });
    fireEvent.change(screen.getByPlaceholderText(/Base de données/i), { target: { value: 'safebase' } });

    fireEvent.click(screen.getByText(/Ajouter la connexion/i));

    await screen.findByText(/Connexion ajoutée avec succès./i);
  });

  // Test fonctionnel : Vérifie la gestion des erreurs de soumission
  test('devrait afficher une alerte en cas d\'erreur lors de la soumission', async () => {

    axios.post.mockRejectedValueOnce(new Error('Erreur lors de l\'ajout de la connexion.'));

    render(<AddDatabase />);

    fireEvent.change(screen.getByPlaceholderText(/Hôte/i), { target: { value: 'localhost' } });
    fireEvent.change(screen.getByPlaceholderText(/Utilisateur/i), { target: { value: 'root' } });
    fireEvent.change(screen.getByPlaceholderText(/Mot de passe/i), { target: { value: 'password' } });
    fireEvent.change(screen.getByPlaceholderText(/Base de données/i), { target: { value: 'test_db' } });

    fireEvent.click(screen.getByText(/Ajouter la connexion/i));

    await screen.findByText(/Erreur lors de l'ajout de la connexion./i);
  });
});