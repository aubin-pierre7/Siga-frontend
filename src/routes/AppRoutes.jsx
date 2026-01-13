import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import { useAuth } from '../context/AuthContext'

// Pages
import Login from '../pages/Auth/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Documents from '../pages/Documents/Documents'
import AddDocument from '../pages/Documents/AddDocument'
import Categories from '../pages/Categories/Categories'
import Users from '../pages/Users/Users'
import Audit from '../pages/Audit/Audit'
import NotFound from '../pages/NotFound'

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

const AppRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes protégées */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/add" element={<AddDocument />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="audit" element={<Audit />} />
        </Route>
        
        {/* Route 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes