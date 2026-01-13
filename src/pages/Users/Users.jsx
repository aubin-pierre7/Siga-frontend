import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiPlus, FiEdit2, FiTrash2, FiSearch, FiMail, FiPhone, FiUserCheck, FiUserX } from 'react-icons/fi'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  // Données factices pour la démo
  useEffect(() => {
    const fetchUsers = () => {
      // Simuler un appel API
      setTimeout(() => {
        const mockUsers = [
          { 
            id: 1, 
            name: 'Jean Dupont', 
            email: 'jean.dupont@example.com', 
            role: 'Administrateur', 
            phone: '+33 6 12 34 56 78',
            status: 'active',
            lastLogin: '2023-12-15T14:30:00Z',
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          { 
            id: 2, 
            name: 'Marie Martin', 
            email: 'marie.martin@example.com', 
            role: 'Gestionnaire', 
            phone: '+33 6 23 45 67 89',
            status: 'active',
            lastLogin: '2023-12-14T09:15:00Z',
            avatar: 'https://i.pravatar.cc/150?img=2'
          },
          { 
            id: 3, 
            name: 'Pierre Durand', 
            email: 'pierre.durand@example.com', 
            role: 'Utilisateur', 
            phone: '+33 6 34 56 78 90',
            status: 'inactive',
            lastLogin: '2023-12-10T16:45:00Z',
            avatar: 'https://i.pravatar.cc/150?img=3'
          },
          { 
            id: 4, 
            name: 'Sophie Lambert', 
            email: 'sophie.lambert@example.com', 
            role: 'Utilisateur', 
            phone: '+33 6 45 67 89 01',
            status: 'active',
            lastLogin: '2023-12-15T11:20:00Z',
            avatar: 'https://i.pravatar.cc/150?img=4'
          },
          { 
            id: 5, 
            name: 'Thomas Moreau', 
            email: 'thomas.moreau@example.com', 
            role: 'Gestionnaire', 
            phone: '+33 6 56 78 90 12',
            status: 'inactive',
            lastLogin: '2023-11-28T13:10:00Z',
            avatar: 'https://i.pravatar.cc/150?img=5'
          }
        ]
        
        setUsers(mockUsers)
        setLoading(false)
      }, 800)
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // Simuler une suppression
    setUsers(users.filter(u => u.id !== userToDelete.id))
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ))
  }

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    )
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Utilisateurs</h1>
          <p className="page-subtitle">Gérez les utilisateurs et leurs accès</p>
        </div>
        <Link to="/users/add" className="btn btn-primary">
          <FiPlus className="me-2" /> Ajouter un utilisateur
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Rôle</th>
                  <th>Contact</th>
                  <th>Dernière connexion</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="rounded-circle me-3" 
                            width="40" 
                            height="40" 
                          />
                          <div>
                            <div className="fw-medium">{user.name}</div>
                            <div className="text-muted small">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          user.role === 'Administrateur' ? 'bg-primary' : 
                          user.role === 'Gestionnaire' ? 'bg-info text-dark' : 'bg-light text-dark'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                          <div className="d-flex align-items-center mb-1">
                            <FiMail size={14} className="me-2" />
                            <span className="small">{user.email}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FiPhone size={14} className="me-2" />
                            <span className="small">{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="small" title={new Date(user.lastLogin).toLocaleString()}>
                          {formatLastLogin(user.lastLogin)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          user.status === 'active' ? 'bg-success' : 'bg-danger'
                        }`}>
                          {user.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            title={user.status === 'active' ? 'Désactiver' : 'Activer'}
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? <FiUserX /> : <FiUserCheck />}
                          </button>
                          <Link 
                            to={`/users/edit/${user.id}`}
                            className="btn btn-outline-secondary"
                            title="Modifier"
                          >
                            <FiEdit2 />
                          </Link>
                          <button
                            className="btn btn-outline-danger"
                            title="Supprimer"
                            onClick={() => handleDeleteClick(user)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="text-muted">
                        <FiUser size={48} className="mb-3" />
                        <p>Aucun utilisateur trouvé</p>
                        {searchTerm && (
                          <button 
                            className="btn btn-link p-0" 
                            onClick={() => setSearchTerm('')}
                          >
                            Réinitialiser la recherche
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmer la suppression</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{userToDelete?.name}</strong> ? 
                Cette action est irréversible.
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Annuler
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users