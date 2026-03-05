import { useState } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState('auth') // 'auth' | 'dashboard'
  const [companyName, setCompanyName] = useState('')

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const company = formData.get('companyName')?.toString().trim() ?? ''

    setCompanyName(company || 'Unnamed company')
    setStep('dashboard')
  }

  const renderLogin = () => (
    <div className="auth-layout">
      <div className="auth-card">
        <header className="auth-header">
          <div className="brand-mark">AS</div>
          <div>
            <h1>🚚 Supply Chain Access Portal</h1>
            <p className="auth-subtitle">
              Log in as a company to access the Autonomous Supply Chain Resilience Agent.
            </p>
          </div>
        </header>

        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <label className="field">
            <span className="field-label">Company name</span>
            <input
              type="text"
              name="companyName"
              placeholder="Acme Logistics Ltd."
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
              <span>Remember this company on this device</span>
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

      <aside className="auth-aside">
        <h2>✨ Autonomous Supply Chain Resilience</h2>
        <p>
          Central access point for companies to log into the Autonomous Supply Chain
          Resilience Agent.
        </p>
        <ul>
          <li>🔐 Company-level authentication only (no individual users yet)</li>
          <li>🧭 Single login flow, no sign-up from this UI</li>
          <li>📊 After login, go directly to the global intelligence dashboard</li>
        </ul>
      </aside>
    </div>
  )

  const renderDashboard = () => (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <span className="dashboard-kicker">
            Autonomous Supply Chain Resilience Agent
          </span>
          <h1>Global Intelligence Dashboard</h1>
        </div>
        <div className="dashboard-company-chip">
          <span className="chip-label">Active company</span>
          <span className="chip-name">{companyName || 'Unnamed company'}</span>
        </div>
      </header>

      <section className="dashboard-map-row">
        <div className="map-card">
          <div className="map-header">
            <div>
              <h2>Global ocean routes &amp; climate</h2>
              <p>
                Conceptual view of major shipping corridors and indicative climate layers
                for decision support.
              </p>
            </div>
            <span className="map-tag">Front-end mock · Not live data</span>
          </div>
          <div className="map-canvas">
            <div className="map-grid" />

            <div className="route route-pacific">
              <span className="route-label">Trans-Pacific</span>
            </div>
            <div className="route route-suez">
              <span className="route-label">Asia → Europe (Suez)</span>
            </div>
            <div className="route route-atlantic">
              <span className="route-label">Transatlantic</span>
            </div>

            <div className="weather weather-storm">
              <span className="weather-icon">⛈</span>
              <span className="weather-label">Cyclone formation</span>
            </div>
            <div className="weather weather-heat">
              <span className="weather-icon">🔥</span>
              <span className="weather-label">Temperature anomaly</span>
            </div>
            <div className="weather weather-swell">
              <span className="weather-icon">🌊</span>
              <span className="weather-label">High swell zone</span>
            </div>
          </div>

          <div className="map-legend">
            <span className="legend-item">
              <span className="legend-color legend-route" />
              Major shipping lanes
            </span>
            <span className="legend-item">
              <span className="legend-color legend-weather" />
              Weather systems
            </span>
            <span className="legend-item">
              <span className="legend-color legend-risk" />
              Climate risk envelope
            </span>
          </div>
        </div>
      </section>

      <section className="dashboard-middle-row">
        <section className="intel-panel">
          <header className="panel-header">
            <h2>Global political &amp; security intelligence</h2>
            <p>
              Mock intelligence items that illustrate how geopolitical events could drive
              routing, lead time, and capacity decisions.
            </p>
          </header>

          <div className="intel-list">
            <article className="intel-card">
              <div className="intel-thumb thumb-redsea" />
              <div className="intel-body">
                <h3>Red Sea shipping disruptions escalate</h3>
                <p>
                  Increased security incidents against cargo vessels are leading major
                  carriers to suspend or reroute traffic away from the Red Sea corridor.
                </p>
                <div className="intel-meta">
                  <span className="meta-tag">Region: Middle East</span>
                  <span className="meta-time">Updated: 2 hours ago</span>
                </div>
              </div>
            </article>

            <article className="intel-card">
              <div className="intel-thumb thumb-pacific" />
              <div className="intel-body">
                <h3>Port congestion risk along key Pacific gateways</h3>
                <p>
                  Labor negotiations and higher-than-expected inbound volumes are
                  generating early signs of congestion at selected Trans-Pacific ports.
                </p>
                <div className="intel-meta">
                  <span className="meta-tag">Region: Asia ↔ North America</span>
                  <span className="meta-time">Updated: 6 hours ago</span>
                </div>
              </div>
            </article>

            <article className="intel-card">
              <div className="intel-thumb thumb-europe" />
              <div className="intel-body">
                <h3>Regulatory scrutiny on critical industrial components</h3>
                <p>
                  Multiple jurisdictions are considering tighter export controls on
                  high-tech industrial parts, increasing the risk of sudden permit
                  changes.
                </p>
                <div className="intel-meta">
                  <span className="meta-tag">Region: Europe / Global</span>
                  <span className="meta-time">Updated: 1 day ago</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="actions-panel">
          <header className="panel-header">
            <h2>Human-in-the-loop actions</h2>
            <p>
              Decision-support suggestions derived from current route and political
              signals. These are not executed automatically.
            </p>
          </header>

          <div className="suggestions-list">
            <article className="suggestion-card">
              <header className="suggestion-header">
                <h3>Reroute Asia–Europe shipments</h3>
                <span className="risk-pill risk-high">High</span>
              </header>
              <p className="suggestion-action">
                Action: Prefer routing via Cape of Good Hope for selected high-value
                cargo.
              </p>
              <p className="suggestion-reason">
                Reason: Escalating security risk and disruptions along the Red Sea
                corridor increase the probability of delays and ad-hoc diversions.
              </p>
              <div className="suggestion-meta">
                <span>Confidence: 82%</span>
                <span>Linked to: Red Sea disruptions</span>
              </div>
            </article>

            <article className="suggestion-card">
              <header className="suggestion-header">
                <h3>Delay Western Pacific sailings</h3>
                <span className="risk-pill risk-medium">Medium</span>
              </header>
              <p className="suggestion-action">
                Action: Introduce a short holding window for departures traversing the
                forecast cyclone zone.
              </p>
              <p className="suggestion-reason">
                Reason: Cyclone activity overlapping with Trans-Pacific lanes raises the
                likelihood of schedule disruption and missed connections.
              </p>
              <div className="suggestion-meta">
                <span>Confidence: 74%</span>
                <span>Linked to: Pacific climate layer</span>
              </div>
            </article>

            <article className="suggestion-card">
              <header className="suggestion-header">
                <h3>Increase inventory buffers in Europe</h3>
                <span className="risk-pill risk-medium">Medium</span>
              </header>
              <p className="suggestion-action">
                Action: Temporarily raise safety stock targets for selected European
                suppliers.
              </p>
              <p className="suggestion-reason">
                Reason: Combined effects of port congestion risk and regulatory
                uncertainty elevate lead-time volatility for inbound components.
              </p>
              <div className="suggestion-meta">
                <span>Confidence: 69%</span>
                <span>Linked to: Port / policy signals</span>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section className="dashboard-bottom-row">
        <div className="chat-panel ai-panel">
          <div className="chat-header">
            <h2>💬 Resilience Copilot</h2>
            <p>
              Compact assistant placeholder for querying risks, lanes, or scenarios. This
              is a front-end mock only and does not yet call a live model.
            </p>
          </div>

          <div className="chat-messages">
            <div className="chat-message assistant">
              <div className="chat-avatar">AI</div>
              <div className="chat-bubble">
                <p>
                  Once wired to a backend, you will be able to ask questions about global
                  disruptions, alternative routes, and mitigation strategies here.
                </p>
              </div>
            </div>
          </div>

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about a route, region, or risk scenario… (front-end only)"
            />
            <button type="submit" className="primary-button chat-send">
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  )

  return (
    <div className="app-root">
      <div className="background-gradient" />
      {step === 'auth' ? renderLogin() : renderDashboard()}
    </div>
  )
}

export default App
