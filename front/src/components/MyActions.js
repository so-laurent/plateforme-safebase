import React, { useEffect, useState } from 'react';

function MyActions() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/my-actions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Mes actions</h1>
  
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Base de données</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">SGBD</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{item.type}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.db_name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.db_type}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyActions;