import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddDatabase from './components/AddDatabase';
import BackupRestore from './components/BackupRestore';
import CronForm from './components/CronForm';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Barre latérale */}
        <div className="bg-gray-800 text-white w-1/6 min-h-screen p-4">
          <nav>
            <ul>
              <li className="mb-4">
                <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
                  Accueil
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/add" className="block p-2 hover:bg-gray-700 rounded">
                  Ajouter une BDD
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/backup-restore" className="block p-2 hover:bg-gray-700 rounded">
                  Sauvegarde/Restauration
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/cron" className="block p-2 hover:bg-gray-700 rounded">
                  CRON
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="w-5/6 bg-gray-100 p-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Routes>
              <Route path="/add" element={<AddDatabase />} />
              <Route path="/backup-restore" element={<BackupRestore />} />
              <Route path="/cron" element={<CronForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
