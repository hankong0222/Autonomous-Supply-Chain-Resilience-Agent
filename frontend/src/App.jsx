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
    const email = formData.get('email')?.toString().trim() ?? ''
    const password = formData.get('password')?.toString() ?? ''

    onLogin({ email, password })
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
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
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
  companyProfile,
  setCompanyProfile,
}) {
  const navigate = useNavigate()
  const [signupForm, setSignupForm] = useState({
    companyName: companyProfile.companyName,
    email: companyProfile.email,
    password: companyProfile.password,
  })

  const updateSignupField = (field) => (event) => {
    setSignupForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const signupPayload = {
      companyName: signupForm.companyName.trim(),
      email: signupForm.email.trim(),
      password: signupForm.password,
    }

    if (!signupPayload.companyName || !signupPayload.email || !signupPayload.password) {
      window.alert('Company name, email, and password are required.')
      return
    }

    setCompanyProfile((prev) => ({
      ...prev,
      ...signupPayload,
    }))

    console.log('Signup request payload (front-end only):', signupPayload)
    navigate('/company-info')
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <header className="auth-header">
          <div className="brand-mark">AS</div>
          <div>
            <h1>Sign Up</h1>
            <p className="auth-subtitle">
              Create a company account before completing the company profile.
            </p>
          </div>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Company Name</span>
            <input
              type="text"
              name="companyName"
              placeholder="Example Logistics Inc."
              value={signupForm.companyName}
              onChange={updateSignupField('companyName')}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              name="email"
              placeholder="contact@example.com"
              autoComplete="email"
              value={signupForm.email}
              onChange={updateSignupField('email')}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              type="password"
              name="password"
              placeholder="password123"
              autoComplete="new-password"
              value={signupForm.password}
              onChange={updateSignupField('password')}
              required
            />
          </label>

          <button type="submit" className="primary-button">
            Continue to Company Info
          </button>
        </form>
      </div>
    </div>
  )
}

function CompanyInfoPage({
  companyProfile,
  setCompanyProfile,
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

    console.log('Company profile form data (front-end only):', {
      companyName: companyProfile.companyName || 'Unnamed company',
      email: companyProfile.email,
      password: companyProfile.password,
      industry: formData.get('industry'),
      mainRoutes: formData.get('mainRoutes'),
      riskTolerance,
      financials: companyProfile.financials,
      suppliers,
      transportTypes,
      logisticsMethods: formData.get('logisticsMethods'),
      uploadedFiles,
    })

    navigate('/dashboard')
  }

  return (
    <CompanyInfoTab
      companyName={companyProfile.companyName}
      financials={companyProfile.financials}
      onFinancialChange={(field, value) =>
        setCompanyProfile((prev) => ({
          ...prev,
          financials: {
            ...prev.financials,
            [field]: value,
          },
        }))
      }
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
      onBack={() => navigate('/signup')}
      onSubmit={handleSubmit}
    />
  )
}

function Dashboard({ companyName }) {
  const navigate = useNavigate()

  return (
    <DashboardTab
      companyName={companyName}
      onEditCompany={() => navigate('/company-info')}
    />
  )
}

function App() {
  const [companyProfile, setCompanyProfile] = useState({
    companyName: '',
    email: '',
    password: '',
    financials: {
      currentAsset: 0,
      currentLiabilities: 0,
      debt: 0,
      equity: 0,
      profit: 0,
      revenue: 0,
    },
  })
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: '', country: '', productType: '' },
  ])
  const [transportTypes, setTransportTypes] = useState([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const handleLogin = (credentials) => {
    setCompanyProfile((prev) => ({
      ...prev,
      ...credentials,
    }))
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="app-root">
          <div className="background-gradient" />
          <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={
              <SignupPage
                companyProfile={companyProfile}
                setCompanyProfile={setCompanyProfile}
              />
            }
          />
          <Route
            path="/company-info"
            element={
              <CompanyInfoPage
                companyProfile={companyProfile}
                setCompanyProfile={setCompanyProfile}
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
            element={<Dashboard companyName={companyProfile.companyName} />}
          />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
