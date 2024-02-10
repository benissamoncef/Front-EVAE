import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EtudiantForm() {
  const [etudiant, setEtudiant] = useState({
    noEtudiantNat: '',
    promotion: '',
    motDePasse: '',
    nom: '',
    prenom: '',
    sexe: ''
  });
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/promotions');
        setPromotions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des promotions :', error);
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEtudiant(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...etudiant,
        promotion: { anneePro: etudiant.promotion }
      };

      await axios.post('http://localhost:8082/api/etudiants', dataToSend);
      alert('Étudiant créé avec succès');
    } catch (error) {
      console.error('Erreur lors de la création de l\'étudiant :', error);
      alert('Une erreur est survenue lors de la création de l\'étudiant');
    }
  };

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="noEtudiantNat" value={etudiant.noEtudiantNat} onChange={handleChange} placeholder="Numéro étudiant" required />
          <select name="promotion" value={etudiant.promotion} onChange={handleChange} required>
            <option value="">Sélectionner une promotion</option>
            {promotions.map(promotion => (
              <option key={promotion.anneePro} value={promotion.anneePro}>{promotion.anneePro}</option>
            ))}
          </select>
          <input type="password" name="motDePasse" value={etudiant.motDePasse} onChange={handleChange} placeholder="Mot de passe" required />
          <input type="text" name="nom" value={etudiant.nom} onChange={handleChange} placeholder="Nom" required />
          <input type="text" name="prenom" value={etudiant.prenom} onChange={handleChange} placeholder="Prénom" required />
          <input type="text" name="sexe" value={etudiant.sexe} onChange={handleChange} placeholder="Sexe" required />
          <button type="submit">Créer Étudiant</button>
        </form>
      )}
    </div>
  );
}

export default EtudiantForm;
