import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiDownload, FiCalendar } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Audit = () => {
  const [auditLogs, setAuditLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    user: '',
    dateFrom: '',
    dateTo: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  // Données factices pour la démo
  useEffect(() => {
    const fetchAuditLogs = () => {
      // Simuler un appel API
      setTimeout(() => {
        const mockLogs = [
          {
            id: 1,
            timestamp: '2023-12-15T14:30:00Z',
            user: 'Jean Dupont',
            action: 'Connexion',
            entity: 'Utilisateur',
            entityId: '1',
            details: 'Connexion réussie',
            ipAddress: '192.168.1.1'
          },
          {
            id: 2,
            timestamp: '2023-12-15T14:25:00Z',
            user: 'Marie Martin',
            action: 'Modification',
            entity: 'Document',
            entityId: '45',
            details: 'Document "Rapport annuel 2023" modifié',
            ipAddress: '192.168.1.2'
          },
          {
            id: 3,
            timestamp: '2023-12-15T13:45:00Z',
            user: 'Pierre Durand',
            action: 'Suppression',
            entity: 'Document',
            entityId: '78',
            details: 'Document "Ancien contrat" supprimé',
            ipAddress: '192.168.1.3'
          },
          {
            id: 4,
            timestamp: '2023-12-15T11:20:00Z',
            user: 'Sophie Lambert',
            action: 'Création',
            entity: 'Catégorie',
            entityId: '9',
            details: 'Nouvelle catégorie "Ressources Humaines" créée',
            ipAddress: '192.168.1.4'
          },
          {
            id: 5,
            timestamp: '2023-12-15T10:15:00Z',
            user: 'Thomas Moreau',
            action: 'Téléchargement',
            entity: 'Document',
            entityId: '112',
            details: 'Document "Présentation Q3" téléchargé',
            ipAddress: '192.168.1.5'
          },
          {
            id: 6,
            timestamp: '2023-12-15T09:30:00Z',
            user: 'Jean Dupont',
            action: 'Modification',
            entity: 'Profil',
            entityId: '1',
            details: 'Mise à jour des informations de profil',
            ipAddress: '192.168.1.1'
          },
          {
            id: 7,
            timestamp: '2023-12-14T16:45:00Z',
            user: 'Marie Martin',
            action: 'Connexion',
            entity: 'Utilisateur',
            entityId: '2',
            details: 'Connexion réussie',
            ipAddress: '192.168.1.2'
          }
        ]
        
        setAuditLogs(mockLogs)
        setLoading(false)
      }, 1000)
    }

    fetchAuditLogs()
  }, [])

  // Données pour le graphique
  const activityData = [
    { name: 'Lun', actions: 12 },
    { name: 'Mar', actions: 19 },
    { name: 'Mer', actions: 15 },
    { name: 'Jeu', actions: 24 },
    { name: 'Ven', actions: 18 },
    { name: 'Sam', actions: 5 },
    { name: 'Dim', actions: 2 }
  ]

  const filteredLogs = auditLogs.filter(log => {
    const matchesType = !filters.type || log.action === filters.type
    const matchesUser = !filters.user || log.user.toLowerCase().includes(filters.user.toLowerCase())
    const matchesDateFrom = !filters.dateFrom || new Date(log.timestamp) >= new Date(filters.dateFrom)
    const matchesDateTo = !filters.dateTo || new Date(log.timestamp) <= new Date(filters.dateTo + 'T23:59:59')
    
    return matchesType && matchesUser && matchesDateFrom && matchesDateTo
  })

  const getActionBadgeClass = (action) => {
    switch (action) {
      case 'Connexion':
        return 'bg-success'
      case 'Déconnexion':
        return 'bg-secondary'
      case 'Création':
        return 'bg-primary'
      case 'Modification':
        return 'bg-warning text-dark'
      case 'Suppression':
        return 'bg-danger'
      case 'Téléchargement':
        return 'bg-info text-dark'
      default:
        return 'bg-light text-dark'
    }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      type: '',
      user: '',
      dateFrom: '',
      dateTo: ''
    })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement du journal d'audit...</p>
      </div>
    )
  }

  return (
    <div className="audit-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Journal d'audit</h1>
          <p className="page-subtitle">Suivi des activités du système</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => setShowFilters(!showFilters)}>
            <FiFilter className="me-2" /> Filtres
          </button>
          <button className="btn btn-outline-primary">
            <FiDownload className="me-2" /> Exporter
          </button>
        </div>
      </div>

      {/* Filtres */}
      {showFilters && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label htmlFor="type" className="form-label">Type d'action</label>
                <select 
                  id="type" 
                  name="type" 
                  className="form-select" 
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">Tous les types</option>
                  <option value="Connexion">Connexion</option>
                  <option value="Déconnexion">Déconnexion</option>
                  <option value="Création">Création</option>
                  <option value="Modification">Modification</option>
                  <option value="Suppression">Suppression</option>
                  <option value="Téléchargement">Téléchargement</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="user" className="form-label">Utilisateur</label>
                <input 
                  type="text" 
                  id="user" 
                  name="user" 
                  className="form-control" 
                  placeholder="Rechercher par utilisateur"
                  value={filters.user}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="dateFrom" className="form-label">Date de début</label>
                <div className="input-group">
                  <span className="input-group-text"><FiCalendar /></span>
                  <input 
                    type="date" 
                    id="dateFrom" 
                    name="dateFrom" 
                    className="form-control" 
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <label htmlFor="dateTo" className="form-label">Date de fin</label>
                <div className="input-group">
                  <span className="input-group-text"><FiCalendar /></span>
                  <input 
                    type="date" 
                    id="dateTo" 
                    name="dateTo" 
                    className="form-control" 
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="col-12 d-flex justify-content-end gap-2">
                <button className="btn btn-outline-secondary" onClick={resetFilters}>
                  Réinitialiser
                </button>
                <button className="btn btn-primary" onClick={() => setShowFilters(false)}>
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Graphique d'activité */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Activité récente</h5>
        </div>
        <div className="card-body" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actions" 
                name="Actions" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tableau des logs */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Journal des activités</h5>
          <div className="text-muted small">
            {filteredLogs.length} événement{filteredLogs.length !== 1 ? 's' : ''} trouvé{filteredLogs.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Date/Heure</th>
                  <th>Utilisateur</th>
                  <th>Action</th>
                  <th>Détails</th>
                  <th>Adresse IP</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map(log => (
                    <tr key={log.id}>
                      <td>
                        <div className="small text-muted">
                          {formatDateTime(log.timestamp)}
                        </div>
                      </td>
                      <td>
                        <div className="fw-medium">{log.user}</div>
                      </td>
                      <td>
                        <span className={`badge ${getActionBadgeClass(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td>
                        <div>
                          <div className="fw-medium">{log.details}</div>
                          <div className="small text-muted">
                            {log.entity} #{log.entityId}
                          </div>
                        </div>
                      </td>
                      <td>
                        <code>{log.ipAddress}</code>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="text-muted">
                        <FiSearch size={48} className="mb-3" />
                        <p>Aucune activité trouvée</p>
                        <button 
                          className="btn btn-link p-0" 
                          onClick={resetFilters}
                        >
                          Réinitialiser les filtres
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Audit