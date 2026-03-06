import { useState, Component } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import CompanyInfoTab from './components/CompanyInfoTab.jsx'
import DashboardTab from './components/DashboardTab.jsx'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-root" style={{ padding: '2rem', textAlign: 'center' }}>
          <div className="background-gradient" />
          <div style={{ position: 'relative', zIndex: 1, color: '#e5e7eb' }}>
            <h1 style={{ marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ marginBottom: '1rem', color: '#9ca3af' }}>
              {this.state.error?.message || 'An error occurred'}
            </p>
            <button
              type="button"
              className="primary-button"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function AuthPage() {
  const navigate = useNavigate()

  return (
    <div className="split-auth-root">
      <div
        className="split-panel login-panel"
        onClick={() => navigate('/login')}
      >
        <div className="split-panel-inner">
          <div className="split-panel-header">
            <h1>Login</h1>
            <p>Access your existing company workspace.</p>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={(event) => {
              event.stopPropagation()
              navigate('/login')
            }}
          >
            Go to Login
          </button>
        </div>
      </div>

      <div
        className="split-panel signup-panel"
        onClick={() => navigate('/signup')}
      >
        <div className="split-panel-inner">
          <div className="split-panel-header">
            <h1>Sign Up</h1>
            <p>Register a new company and set up details.</p>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={(event) => {
              event.stopPropagation()
              navigate('/signup')
            }}
          >
            Go to Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const company = formData.get('companyName')?.toString().trim() ?? ''

    onLogin(company || 'Unnamed company')
    navigate('/dashboard')
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <header className="auth-header">
          <div className="brand-mark">AS</div>
          <div>
            <h1>Login</h1>
            <p className="auth-subtitle">
              Access your existing company workspace.
            </p>
          </div>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              name="companyName"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <div className="auth-actions">
            <label className="remember">
              <input type="checkbox" name="remember" />
              <span>Remember on this device</span>
            </label>
            <button type="button" className="link-button">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

function SignupPage({
  companyName,
  setCompanyName,
  riskTolerance,
  setRiskTolerance,
  suppliers,
  setSuppliers,
  transportTypes,
  setTransportTypes,
  isDragActive,
  setIsDragActive,
  uploadedFiles,
  setUploadedFiles,
}) {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const company = formData.get('companyName')?.toString().trim() ?? companyName

    setCompanyName(company || 'Unnamed company')

    console.log('Company setup form data (front-end only):', {
      companyName: company || 'Unnamed company',
      industry: formData.get('industry'),
      mainRoutes: formData.get('mainRoutes'),
      riskTolerance,
      suppliers,
      transportTypes,
      operationalBudget: formData.get('operationalBudget'),
      logisticsMethods: formData.get('logisticsMethods'),
      uploadedFiles,
    })

    navigate('/dashboard')
  }

  return (
    <CompanyInfoTab
      companyName={companyName}
      riskTolerance={riskTolerance}
      setRiskTolerance={setRiskTolerance}
      suppliers={suppliers}
      setSuppliers={setSuppliers}
      transportTypes={transportTypes}
      setTransportTypes={setTransportTypes}
      isDragActive={isDragActive}
      setIsDragActive={setIsDragActive}
      uploadedFiles={uploadedFiles}
      setUploadedFiles={setUploadedFiles}
      onBack={() => navigate('/')}
      onSubmit={handleSubmit}
    />
  )
}

function Dashboard({ companyName }) {
  const navigate = useNavigate()

  return (
    <DashboardTab
      companyName={companyName}
      onEditCompany={() => navigate('/signup')}
    />
  )
}

function App() {
  const [companyName, setCompanyName] = useState('')
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: '', country: '', productType: '' },
  ])
  const [transportTypes, setTransportTypes] = useState([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app-root">
          <div className="background-gradient" />
          <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/login"
            element={<LoginPage onLogin={setCompanyName} />}
          />
          <Route
            path="/signup"
            element={
              <SignupPage
                companyName={companyName}
                setCompanyName={setCompanyName}
                riskTolerance={riskTolerance}
                setRiskTolerance={setRiskTolerance}
                suppliers={suppliers}
                setSuppliers={setSuppliers}
                transportTypes={transportTypes}
                setTransportTypes={setTransportTypes}
                isDragActive={isDragActive}
                setIsDragActive={setIsDragActive}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard companyName={companyName} />}
          />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
