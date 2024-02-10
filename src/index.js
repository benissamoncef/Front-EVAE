import React from 'react';
import ReactDOM from 'react-dom/client';
import EtudiantForm from './Composants/Etudiant/InscriptionEtudiant';
import LoginForm from './Composants/Etudiant/LoginEtudiant';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <LoginForm/>
    <EtudiantForm/>
    </>
  </React.StrictMode>
);
