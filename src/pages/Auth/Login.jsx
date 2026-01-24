import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiLock, FiMail } from 'react-icons/fi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    try {
      setError('')
      setLoading(true)
      const result = await login(email, password)

      if (result && result.success) {
        navigate('/')
      } else {
        setError(result?.message || 'Échec de la connexion. Veuillez réessayer.')
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header text-center">
          <h1 className="mb-2">Connexion</h1>
          <p className="text-muted">Accédez à votre espace d'administration</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label text-center">
              Adresse email
            </label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label text-center">
              Mot de passe
            </label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>

            <div className="text-center mt-1">
              <Link to="/forgot-password" className="text-sm text-primary">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="text-center text-muted">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-primary">
              Demander un compte
            </Link>
          </p>
        </div>
      </div>

      <footer className="mt-5 text-center text-muted">
        <p className="mb-0">2026 SIGA - Tous droits réservés</p>
      </footer>
    </div>
  )
}

export default Login
