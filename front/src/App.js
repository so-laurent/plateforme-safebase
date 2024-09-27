import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddDatabase from './components/AddDatabase';
import BackupRestore from './components/BackupRestore';
import CronForm from './components/CronForm';
import MyDatabases from './components/MyDatabases';
import Home from './components/Home';
import MyBackups from './components/MyBackups';
import MyCrons from './components/MyCrons';
import MyActions from './components/MyActions';

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
                  Ajouter une base de données
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/my-databases" className="block p-2 hover:bg-gray-700 rounded">
                  Mes bases de données
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/backup-restore" className="block p-2 hover:bg-gray-700 rounded">
                  Sauvegarde/Restauration
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/my-backups" className="block p-2 hover:bg-gray-700 rounded">
                  Mes sauvegardes
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/my-actions" className="block p-2 hover:bg-gray-700 rounded">
                  Mes actions
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/cron" className="block p-2 hover:bg-gray-700 rounded">
                  Planifier des sauvegardes régulières (CRON)
                </Link>
              </li>
              <li className="mb-4">
                <Link to="/my-crons" className="block p-2 hover:bg-gray-700 rounded">
                  Mes CRON
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="w-5/6 bg-gray-100 p-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddDatabase />} />
              <Route path="/my-databases" element={<MyDatabases />} />
              <Route path="/my-backups" element={<MyBackups />} />
              <Route path="/backup-restore" element={<BackupRestore />} />
              <Route path="/my-actions" element={<MyActions />} />
              <Route path="/cron" element={<CronForm />} />
              <Route path="/my-crons" element={<MyCrons />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
