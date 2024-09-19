import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddDatabase from './components/AddDatabase';
import BackupRestore from './components/BackupRestore';
import CronForm from './components/CronForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/add">Ajouter une BDD</Link>
            </li>
            <li>
              <Link to="/backup-restore">Sauvegarde/Restauration</Link>
            </li>
            <li>
              <Link to="/cron">CRON</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/add" element={<AddDatabase />} />
          <Route path="/backup-restore" element={<BackupRestore />} />
          <Route path="/cron" element={<CronForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;