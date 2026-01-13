import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiFolder, FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)

  // Données factices pour la démo
  useEffect(() => {
    const fetchCategories = () => {
      // Simuler un appel API
      setTimeout(() => {
        const mockCategories = [
          { id: 1, name: 'Contrats', description: 'Tous les contrats de l\'entreprise', documentCount: 245 },
          { id: 2, name: 'Factures', description: 'Factures clients et fournisseurs', documentCount: 178 },
          { id: 3, name: 'Rapports', description: 'Rapports mensuels et annuels', documentCount: 89 },
          { id: 4, name: 'Présentations', description: 'Présentations et supports de réunion', documentCount: 67 },
          { id: 5, name: 'Ressources Humaines', description: 'Documents liés aux RH', documentCount: 132 },
          { id: 6, name: 'Finances', description: 'Documents financiers et comptables', documentCount: 94 },
          { id: 7, name: 'Juridique', description: 'Documents juridiques et contrats', documentCount: 56 },
          { id: 8, name: 'Marketing', description: 'Documents marketing et publicitaires', documentCount: 42 }
        ]
        
        setCategories(mockCategories)
        setLoading(false)
      }, 800)
    }

    fetchCategories()
  }, [])

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // Simuler une suppression
    setCategories(categories.filter(cat => cat.id !== categoryToDelete.id))
    setShowDeleteModal(false)
    setCategoryToDelete(null)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des catégories...</p>
      </div>
    )
  }

  return (
    <div className="categories-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Catégories</h1>
          <p className="page-subtitle">Gérez vos catégories de documents</p>
        </div>
        <Link to="/categories/add" className="btn btn-primary">
          <FiPlus className="me-2" /> Nouvelle catégorie
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
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => (
                <div key={category.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="category-card h-100">
                    <div className="d-flex align-items-center mb-3">
                      <div className="category-icon me-3">
                        <FiFolder size={24} />
                      </div>
                      <h5 className="mb-0">{category.name}</h5>
                    </div>
                    <p className="text-muted small mb-3">{category.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-light text-dark">
                        {category.documentCount} document{category.documentCount !== 1 ? 's' : ''}
                      </span>
                      <div className="btn-group btn-group-sm">
                        <Link 
                          to={`/categories/edit/${category.id}`}
                          className="btn btn-outline-primary"
                          title="Modifier"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          title="Supprimer"
                          onClick={() => handleDeleteClick(category)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="text-muted">
                  <FiFolder size={48} className="mb-3" />
                  <p>Aucune catégorie trouvée</p>
                  {searchTerm && (
                    <button 
                      className="btn btn-link p-0" 
                      onClick={() => setSearchTerm('')}
                    >
                      Réinitialiser la recherche
                    </button>
                  )}
                </div>
              </div>
            )}
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
                Êtes-vous sûr de vouloir supprimer la catégorie <strong>{categoryToDelete?.name}</strong> ? 
                Cette action est irréversible et affectera tous les documents associés.
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

export default Categories