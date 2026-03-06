import { useState } from 'react'
import './App.css'
import LoginTab from './components/LoginTab.jsx'
import SignupTab from './components/SignupTab.jsx'
import CompanyInfoTab from './components/CompanyInfoTab.jsx'
import DashboardTab from './components/DashboardTab.jsx'

function App() {
  const [step, setStep] = useState('auth') // 'auth' | 'setup' | 'dashboard'
  const [authMode, setAuthMode] = useState('login') // 'login' | 'signup'
  const [companyName, setCompanyName] = useState('')
  const [hasCompanyData, setHasCompanyData] = useState(false)
  const [riskTolerance, setRiskTolerance] = useState(50)
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: '', country: '', productType: '' },
  ])
  const [transportTypes, setTransportTypes] = useState([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const company = formData.get('companyName')?.toString().trim() ?? ''

    setCompanyName(company || 'Unnamed company')
    // In this front-end prototype, "hasCompanyData" is tracked in memory:
    // - if company data has been set up in this session, go directly to dashboard
    // - otherwise, send the user to the company setup page first
    setStep(hasCompanyData ? 'dashboard' : 'setup')
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const company = formData.get('companyName')?.toString().trim() ?? ''

    setCompanyName(company || 'Unnamed company')
    setHasCompanyData(false)
    setStep('setup')
  }

  const handleSetupSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    console.log('Company setup form data (front-end only):', {
      companyName,
      industry: formData.get('industry'),
      mainRoutes: formData.get('mainRoutes'),
      riskTolerance,
      suppliers,
      transportTypes,
      operationalBudget: formData.get('operationalBudget'),
      logisticsMethods: formData.get('logisticsMethods'),
      uploadedFiles,
    })

    setHasCompanyData(true)
    setStep('dashboard')
  }

  return (
    <div className="app-root">
      <div className="background-gradient" />
      {step === 'auth' && (
        <div className="split-auth-root">
          <LoginTab
            authMode={authMode}
            setAuthMode={setAuthMode}
            onSubmit={handleLoginSubmit}
          />
          <SignupTab
            authMode={authMode}
            setAuthMode={setAuthMode}
            onSubmit={handleSignupSubmit}
          />
        </div>
      )}
      {step === 'setup' && (
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
          onBack={() => setStep('auth')}
          onSubmit={handleSetupSubmit}
        />
      )}
      {step === 'dashboard' && <DashboardTab companyName={companyName} />}
    </div>
  )
}

export default App
