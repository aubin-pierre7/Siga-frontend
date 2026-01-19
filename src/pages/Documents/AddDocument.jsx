import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUpload, FiX, FiPlus, FiTrash2 } from 'react-icons/fi'

const AddDocument = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    file: null,
    newTag: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState('')

  const categories = [
    { id: 1, name: 'Contrats' },
    { id: 2, name: 'Factures' },
    { id: 3, name: 'Rapports' },
    { id: 4, name: 'Présentations' },
    { id: 5, name: 'Autres' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('La taille du fichier ne doit pas dépasser 10MB')
        return
      }

      // Vérifier le type de fichier
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        setError('Type de fichier non pris en charge')
        return
      }

      setFormData(prev => ({
        ...prev,
        file
      }))

      // Afficher un aperçu si c'est une image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setPreview('')
      }

      setError('')
    }
  }

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }))
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      setError('Le titre est requis')
      return
    }
    
    if (!formData.category) {
      setError('Veuillez sélectionner une catégorie')
      return
    }
    
    if (!formData.file) {
      setError('Veuillez sélectionner un fichier')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Rediriger vers la liste des documents avec un message de succès
      navigate('/documents', { state: { success: 'Le document a été ajouté avec succès' } })
    } catch (err) {
      console.error('Erreur lors de l\'ajout du document:', err)
      setError('Une erreur est survenue lors de l\'ajout du document')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="add-document-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Ajouter un document</h1>
          <p className="page-subtitle">Remplissez les détails du document</p>
        </div>
        <button 
          className="btn btn-outline-secondary" 
          onClick={() => navigate(-1)}
        >
          <FiX className="me-2" /> Annuler
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-4">{error}</div>}

            <div className="row">
              <div className="col-md-8">
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">Titre du document <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Ex: Contrat de travail"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Ajoutez une description détaillée du document..."
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="category" className="form-label">Catégorie <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label">Tags</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ajouter un tag"
                        value={formData.newTag}
                        onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleAddTag}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span key={tag} className="badge bg-light text-dark d-flex align-items-center">
                          {tag}
                          <button
                            type="button"
                            className="btn btn-link p-0 ms-2"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="file-upload-container">
                  <div className="file-upload-area">
                    {preview ? (
                      <div className="preview-container">
                        <img src={preview} alt="Aperçu" className="img-preview" />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger remove-preview"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, file: null }))
                            setPreview('')
                          }}
                        >
                          <FiTrash2 /> Changer
                        </button>
                      </div>
                    ) : (
                      <div className="file-upload-placeholder">
                        <label htmlFor="file-upload" className="btn btn-outline-primary">
                          Sélectionner un fichier
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          className="d-none"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                        />
                      </div>
                    )}
                  </div>

                  {formData.file && (
                    <div className="file-info mt-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{formData.file.name}</h6>
                          <p className="mb-0 text-muted small">
                            {Math.round(formData.file.size / 1024)} KB • {formData.file.type}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, file: null }))
                            setPreview('')
                          }}
                        >
                          <FiX />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer le document'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddDocument