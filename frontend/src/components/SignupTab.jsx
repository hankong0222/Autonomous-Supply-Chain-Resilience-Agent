function SignupTab({
  authMode,
  setAuthMode,
  onSubmit,
  previewMode,
  setPreviewMode,
  selectedMode,
  setSelectedMode,
}) {
  const handleClick = () => {
    if (!selectedMode) {
      setSelectedMode('signup')
      setAuthMode('signup')
    }
  }

  const handleMouseEnter = () => {
    if (!selectedMode) {
      setPreviewMode('signup')
    }
  }

  const handleMouseLeave = () => {
    if (!selectedMode && previewMode === 'signup') {
      setPreviewMode(null)
    }
  }

  return (
    <div
      className={`split-panel signup-panel ${
        authMode === 'signup' ? 'split-panel-active' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="split-panel-inner">
        <div className="split-panel-header">
          <h1>Sign Up</h1>
          <p>Register a new company to get started.</p>
        </div>

        {authMode === 'signup' && (
          <form className="auth-form" onSubmit={onSubmit}>
            <label className="field">
              <span className="field-label">Company name</span>
              <input
                type="text"
                name="companyName"
                placeholder="New partner company name"
                required
              />
            </label>

            <label className="field">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="adminEmail"
                placeholder="contact@company.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="field">
              <span className="field-label">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Create a secure password"
                autoComplete="new-password"
                required
              />
            </label>

            <label className="field">
              <span className="field-label">Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat the password"
                autoComplete="new-password"
                required
              />
            </label>

            <button type="submit" className="primary-button">
              Sign Up &amp; continue
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default SignupTab
