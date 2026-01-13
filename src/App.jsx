import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Documents from './pages/Documents/Documents'
import AddDocument from './pages/Documents/AddDocument'
import Categories from './pages/Categories/Categories'
import Users from './pages/Users/Users'
import Audit from './pages/Audit/Audit'
import NotFound from './pages/NotFound'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
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
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App