import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        username: username,
        password: password
      };

      const response = await axios.post('http://localhost:8082/api/etudiants/login', loginData);

      // Réinitialiser les champs de saisie
      setUsername('');
      setPassword('');
      // Traiter la réponse si nécessaire
      alert('Authentification réussie');
    } catch (error) {
      // Gérer les erreurs
      if (error.response && error.response.status === 401) {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      } else {
        setError('Une erreur s\'est produite. Veuillez réessayer.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
