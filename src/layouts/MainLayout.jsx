import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  FiHome, 
  FiFileText, 
  FiPlusCircle, 
  FiFolder, 
  FiUsers, 
  FiActivity, 
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import '../styles/layout.css'

const MainLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { path: '/', label: 'Tableau de bord', icon: <FiHome /> },
    { path: '/documents', label: 'Documents', icon: <FiFileText /> },
    { path: '/documents/add', label: 'Ajouter un document', icon: <FiPlusCircle /> },
    { path: '/categories', label: 'Catégories', icon: <FiFolder /> },
    { path: '/users', label: 'Utilisateurs', icon: <FiUsers /> },
    { path: '/audit', label: 'Audit', icon: <FiActivity /> },
  ]

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>SIGA</h2>
          <p>Système d'Information de Gestion des Archives</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li 
                key={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <span className="icon">{item.icon}</span>
                  <span className="label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut className="icon" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <button 
            className="menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          
          <div className="user-info">
            <span className="welcome">Bonjour,</span>
            <span className="username">{user?.name || 'Utilisateur'}</span>
          </div>
        </header>

        <div className="content-container">
          <Outlet />
        </div>
      </main>

      {/* Overlay pour mobile */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default MainLayout