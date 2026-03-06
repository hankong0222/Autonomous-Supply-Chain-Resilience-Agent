function LoginTab({
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
      setSelectedMode('login')
      setAuthMode('login')
    }
  }

  const handleMouseEnter = () => {
    if (!selectedMode) {
      setPreviewMode('login')
    }
  }

  const handleMouseLeave = () => {
    if (!selectedMode && previewMode === 'login') {
      setPreviewMode(null)
    }
  }

  return (
    <div
      className={`split-panel login-panel ${
        authMode === 'login' ? 'split-panel-active' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="split-panel-inner">
        <div className="split-panel-header">
          <h1>Login</h1>
          <p>Access your existing company workspace.</p>
        </div>

        {authMode === 'login' && (
          <form className="auth-form" onSubmit={onSubmit}>
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
        )}
      </div>
    </div>
  )
}

export default LoginTab
