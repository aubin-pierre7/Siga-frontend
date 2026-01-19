import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiFileText, FiSearch, FiPlus, FiDownload, FiEye, FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi'

const Documents = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState(null)

  // Catégories factices
  const categories = [
    { id: 1, name: 'Tous les documents' },
    { id: 2, name: 'Contrats' },
    { id: 3, name: 'Factures' },
    { id: 4, name: 'Rapports' },
    { id: 5, name: 'Présentations' },
    { id: 6, name: 'Autres' }
  ]

  // Données factices pour la démo
  useEffect(() => {
    const fetchDocuments = () => {
      // Simuler un appel API
      setTimeout(() => {
        const mockDocuments = Array.from({ length: 35 }, (_, i) => ({
          id: i + 1,
          title: `Document ${i + 1}`,
          description: `Description du document ${i + 1}`,
          category: ['Contrats', 'Factures', 'Rapports', 'Présentations', 'Autres'][Math.floor(Math.random() * 5)],
          uploadDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          fileSize: Math.floor(Math.random() * 5000) + 500, // Taille entre 500KB et 5.5MB
          fileType: ['pdf', 'docx', 'xlsx', 'pptx', 'jpg'][Math.floor(Math.random() * 5)],
          tags: ['important', 'archivé', 'signé', 'brouillon'].slice(0, Math.floor(Math.random() * 3) + 1)
        }))
        
        setDocuments(mockDocuments)
        setLoading(false)
      }, 800)
    }

    fetchDocuments()
  }, [])

  // Filtrer les documents par terme de recherche et catégorie
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || doc.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleDeleteClick = (doc) => {
    setDocumentToDelete(doc)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // Simuler une suppression
    setDocuments(documents.filter(doc => doc.id !== documentToDelete.id))
    setShowDeleteModal(false)
    setDocumentToDelete(null)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <span className="file-icon pdf">PDF</span>
      case 'docx':
      case 'doc':
        return <span className="file-icon doc">DOC</span>
      case 'xlsx':
      case 'xls':
        return <span className="file-icon xls">XLS</span>
      case 'pptx':
      case 'ppt':
        return <span className="file-icon ppt">PPT</span>
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <span className="file-icon img">IMG</span>
      default:
        return <span className="file-icon">FILE</span>
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des documents...</p>
      </div>
    )
  }

  return (
    <div className="documents-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Documents</h1>
          <p className="page-subtitle">Gérez vos documents administratifs</p>
        </div>
        <Link to="/documents/add" className="btn btn-primary">
          <FiPlus className="me-2" /> Ajouter un document
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
                placeholder="Rechercher un document..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset à la première page lors d'une nouvelle recherche
                }}
              />
            </div>

            <div className="d-flex align-items-center">
              <label htmlFor="category-filter" className="me-2 mb-0">
                <FiFilter className="me-1" />
                Catégorie:
              </label>
              <select
                id="category-filter"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setCurrentPage(1) // Reset à la première page lors d'un changement de filtre
                }}
              >
                <option value="">Toutes les catégories</option>
                {categories
                  .filter(cat => cat.id !== 1) // Exclure "Tous les documents" des options
                  .map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nom du document</th>
                  <th>Type</th>
                  <th>Catégorie</th>
                  <th>Taille</th>
                  <th>Date d'ajout</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {getFileIcon(doc.fileType)}
                          <div className="ms-3">
                            <div className="fw-medium">{doc.title}</div>
                            <div className="text-muted small">{doc.description}</div>
                            <div className="mt-1">
                              {doc.tags.map(tag => (
                                <span key={tag} className="badge bg-light text-dark me-1 mb-1">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-uppercase">{doc.fileType}</td>
                      <td>
                        <span className="badge bg-light text-dark">{doc.category}</span>
                      </td>
                      <td>{formatFileSize(doc.fileSize * 1024)}</td>
                      <td>{new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-primary" 
                            title="Voir"
                          >
                            <FiEye />
                          </button>
                          <button 
                            className="btn btn-outline-secondary" 
                            title="Télécharger"
                          >
                            <FiDownload />
                          </button>
                          <button 
                            className="btn btn-outline-warning" 
                            title="Modifier"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="btn btn-outline-danger" 
                            title="Supprimer"
                            onClick={() => handleDeleteClick(doc)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="text-muted">
                        <FiFileText size={48} className="mb-3" />
                        <p>Aucun document trouvé</p>
                        {searchTerm || selectedCategory ? (
                          <button 
                            className="btn btn-link p-0" 
                            onClick={() => {
                              setSearchTerm('')
                              setSelectedCategory('')
                            }}
                          >
                            Réinitialiser les filtres
                          </button>
                        ) : (
                          <Link to="/documents/add" className="btn btn-primary mt-2">
                            <FiPlus className="me-2" /> Ajouter un document
                          </Link>
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
                Êtes-vous sûr de vouloir supprimer le document <strong>{documentToDelete?.title}</strong> ? Cette action est irréversible.
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

export default Documents