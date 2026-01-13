import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="not-found-page d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="mb-4">Page non trouvée</h2>
        <p className="lead text-muted mb-4">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn btn-primary">
          <FiArrowLeft className="me-2" /> Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default NotFound