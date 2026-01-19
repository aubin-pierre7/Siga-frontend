import { useEffect, useState } from 'react'
import { FiFileText, FiFolder, FiUsers, FiActivity } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalCategories: 0,
    totalUsers: 0,
    recentDocuments: []
  })

  const [loading, setLoading] = useState(true)

  // Données factices pour la démo
  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setStats({
        totalDocuments: 1245,
        totalCategories: 24,
        totalUsers: 8,
        recentDocuments: [
          { id: 1, title: 'Rapport annuel 2023', category: 'Rapports', date: '2023-12-15' },
          { id: 2, title: 'Contrat client X', category: 'Contrats', date: '2023-12-10' },
          { id: 3, title: 'Présentation équipe', category: 'Présentations', date: '2023-12-05' },
          { id: 4, title: 'Budget Q4', category: 'Finances', date: '2023-11-28' },
          { id: 5, title: 'Planning projet Z', category: 'Projets', date: '2023-11-20' }
        ]
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Données pour le graphique
  const chartData = [
    { name: 'Jan', documents: 65 },
    { name: 'Fév', documents: 59 },
    { name: 'Mar', documents: 80 },
    { name: 'Avr', documents: 81 },
    { name: 'Mai', documents: 56 },
    { name: 'Juin', documents: 55 },
    { name: 'Juil', documents: 40 }
  ]

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des données...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Tableau de bord</h1>
      <p className="page-subtitle">Aperçu de l'activité récente</p>

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-100 text-blue-600">
            <FiFileText size={24} />
          </div>
          <div className="stat-info">
            <h3>Documents</h3>
            <p className="stat-number">{stats.totalDocuments.toLocaleString()}</p>
            <p className="stat-desc">+12% par rapport au mois dernier</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green-100 text-green-600">
            <FiFolder size={24} />
          </div>
          <div className="stat-info">
            <h3>Catégories</h3>
            <p className="stat-number">{stats.totalCategories}</p>
            <p className="stat-desc">+2 nouvelles catégories</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple-100 text-purple-600">
            <FiUsers size={24} />
          </div>
          <div className="stat-info">
            <h3>Utilisateurs</h3>
            <p className="stat-number">{stats.totalUsers}</p>
            <p className="stat-desc">+1 nouvel utilisateur</p>
          </div>
        </div>
      </div>

      {/* Graphique */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Activité des documents (7 derniers mois)</h3>
        </div>
        <div className="card-body" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="documents" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Documents récents */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3>Documents récemment ajoutés</h3>
          <a href="/documents" className="btn btn-outline btn-sm">
            Voir tout
          </a>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Nom du document</th>
                  <th>Catégorie</th>
                  <th>Date d'ajout</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <FiFileText className="me-2 text-muted" />
                        {doc.title}
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{doc.category}</span>
                    </td>
                    <td>{new Date(doc.date).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <button className="btn btn-sm btn-outline me-1">
                        Voir
                      </button>
                      <button className="btn btn-sm btn-outline">
                        Télécharger
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard