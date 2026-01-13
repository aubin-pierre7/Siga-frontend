import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Vérifier l'état de connexion au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          // Simuler une vérification de token
          // En production, vous feriez une requête au serveur pour valider le token
          setUser({ id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' })
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Erreur de vérification de session:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      // Simulation d'une requête de connexion
      if (email === 'admin@example.com' && password === 'password') {
        const userData = { id: 1, name: 'Admin', email, role: 'admin' }
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('token', 'dummy-jwt-token')
        return { success: true, message: 'Connexion réussie' }
      } else {
        return { success: false, message: 'Identifiants incorrects' }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      return { success: false, message: error.message || 'Une erreur est survenue lors de la connexion' }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
}