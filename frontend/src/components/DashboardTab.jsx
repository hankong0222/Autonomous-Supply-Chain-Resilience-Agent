import { useState } from 'react'
import GlobalOceanMap from './GlobalOceanMap'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const DEFAULT_RECIPIENT = 'billchen20050303@gmail.com'

function DashboardTab({ companyName, onEditCompany }) {
  const [sendStatus, setSendStatus] = useState({}) // { id: 'sending' | 'sent' | 'error' }
  const [alertStatus, setAlertStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: 'Ask about routes, risk zones, weather impacts, or alternative routing. I can help with supply chain resilience decisions.',
    },
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  const handleSendEmail = async (id, subject, message) => {
    setSendStatus((prev) => ({ ...prev, [id]: 'sending' }))
    try {
      const res = await fetch(`${API_BASE}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: DEFAULT_RECIPIENT,
          subject,
          message,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || data.details || 'Failed to send')
      setSendStatus((prev) => ({ ...prev, [id]: 'sent' }))
    } catch (err) {
      console.error('Send email error:', err)
      setSendStatus((prev) => ({ ...prev, [id]: 'error' }))
    }
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    const msg = chatInput.trim()
    if (!msg || chatLoading) return
    setChatInput('')
    setChatMessages((prev) => [...prev, { role: 'user', text: msg }])
    setChatLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      const reply = res.ok ? data.response : 'Sorry, the assistant is temporarily unavailable.'
      setChatMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch (err) {
      console.error('Chat error:', err)
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Connection error. Please try again.' },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  const handleSendRiskAlert = async () => {
    setAlertStatus('sending')
    try {
      const res = await fetch(`${API_BASE}/api/send-alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route: 'Shanghai → Los Angeles',
          suggestion:
            'Delay shipment by 24 hours due to severe storm conditions.',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || data.details || 'Failed to send alert')
      setAlertStatus('sent')
    } catch (err) {
      console.error('Send risk alert error:', err)
      setAlertStatus('error')
    }
  }

  return (
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

      <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {onEditCompany && (
          <button
            type="button"
            className="secondary-button"
            onClick={onEditCompany}
          >
            Edit Company Information
          </button>
        )}
        <button
          type="button"
          className="primary-button"
          onClick={handleSendRiskAlert}
          disabled={alertStatus === 'sending'}
        >
          {alertStatus === 'sending'
            ? 'Sending…'
            : alertStatus === 'sent'
              ? 'Risk Alert Sent'
              : alertStatus === 'error'
                ? 'Retry Risk Alert'
                : 'Send Risk Alert'}
        </button>
      </div>

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
          <div className="map-canvas map-canvas-google">
            <GlobalOceanMap />
          </div>

          <div className="map-legend">
            <span className="legend-item">
              <span className="legend-color" style={{ background: '#00c2ff' }} />
              Ocean
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{ background: '#9b59b6' }} />
              Air
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{ background: '#f39c12' }} />
              Truck
            </span>
            <span className="legend-item">
              <span className="legend-color legend-risk" />
              High risk
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{ background: '#eab308' }} />
              Medium risk
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{ background: '#22c55e' }} />
              Low risk
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
        <div className="notifications-panel">
          <header className="panel-header">
            <h2>Automated partner notifications (email drafts)</h2>
            <p>
              Example outbound messages the agent would generate for low and medium risk
              operations. High-risk items remain in the actions panel for human approval.
            </p>
          </header>

          <div className="notifications-list">
            <article className="notification-item">
              <div className="notification-header">
                <span className="notification-op">Operation: Shipment A</span>
                <span className="risk-pill risk-low">Low</span>
              </div>
              <div className="notification-body">
                <p className="notification-meta">
                  Cause: Minor schedule impact due to North Pacific weather variability.
                  Auto-email prepared for downstream partners.
                </p>
                <div className="notification-email">
                  <div className="notification-email-header">
                    <span className="email-label">Subject</span>
                    <span className="email-value">
                      Updated ETA for Shipment A – minor weather-related delay
                    </span>
                  </div>
                  <div className="notification-email-header">
                    <span className="email-label">To</span>
                    <span className="email-value">
                      Key distribution partners on Trans-Pacific lane
                    </span>
                  </div>
                  <div className="notification-email-body">
                    <p>
                      Dear partner, based on current North Pacific conditions we expect a
                      minor delay for Shipment A. The updated estimated time of arrival is
                      within the normal delivery window. No changes to booking or
                      documentation are required at this time.
                    </p>
                    <p>
                      This notification is informational only and was generated
                      automatically by the Autonomous Supply Chain Resilience Agent.
                    </p>
                  </div>
                </div>
                <div className="notification-send-row">
                  <button
                    type="button"
                    className="primary-button notification-send-btn"
                    onClick={() =>
                      handleSendEmail(
                        'shipment-a',
                        'Updated ETA for Shipment A – minor weather-related delay',
                        'Dear partner, based on current North Pacific conditions we expect a minor delay for Shipment A. The updated estimated time of arrival is within the normal delivery window. No changes to booking or documentation are required at this time.\n\nThis notification is informational only and was generated automatically by the Autonomous Supply Chain Resilience Agent.'
                      )
                    }
                    disabled={sendStatus['shipment-a'] === 'sending'}
                  >
                    {sendStatus['shipment-a'] === 'sending'
                      ? 'Sending…'
                      : sendStatus['shipment-a'] === 'sent'
                        ? 'Sent'
                        : sendStatus['shipment-a'] === 'error'
                          ? 'Retry'
                          : `Send to ${DEFAULT_RECIPIENT}`}
                  </button>
                </div>
              </div>
            </article>

            <article className="notification-item">
              <div className="notification-header">
                <span className="notification-op">Operation: Shipment B</span>
                <span className="risk-pill risk-medium">Medium</span>
              </div>
              <div className="notification-body">
                <p className="notification-meta">
                  Cause: Emerging congestion risk at selected Pacific gateways. Draft
                  email proposes a revised delivery window.
                </p>
                <div className="notification-email">
                  <div className="notification-email-header">
                    <span className="email-label">Subject</span>
                    <span className="email-value">
                      Proactive notice – potential delay for Shipment B
                    </span>
                  </div>
                  <div className="notification-email-header">
                    <span className="email-label">To</span>
                    <span className="email-value">
                      Affected customers and logistics partners in North America
                    </span>
                  </div>
                  <div className="notification-email-body">
                    <p>
                      Dear partner, we are monitoring early signs of congestion at key
                      Pacific ports that may impact Shipment B. At this stage we forecast
                      a possible delay of 12–24 hours compared with the original ETA.
                    </p>
                    <p>
                      We will provide a further update if the risk level increases. This
                      message was auto-generated to give you early visibility into
                      potential schedule changes.
                    </p>
                  </div>
                </div>
                <div className="notification-send-row">
                  <button
                    type="button"
                    className="primary-button notification-send-btn"
                    onClick={() =>
                      handleSendEmail(
                        'shipment-b',
                        'Proactive notice – potential delay for Shipment B',
                        'Dear partner, we are monitoring early signs of congestion at key Pacific ports that may impact Shipment B. At this stage we forecast a possible delay of 12–24 hours compared with the original ETA.\n\nWe will provide a further update if the risk level increases. This message was auto-generated to give you early visibility into potential schedule changes.'
                      )
                    }
                    disabled={sendStatus['shipment-b'] === 'sending'}
                  >
                    {sendStatus['shipment-b'] === 'sending'
                      ? 'Sending…'
                      : sendStatus['shipment-b'] === 'sent'
                        ? 'Sent'
                        : sendStatus['shipment-b'] === 'error'
                          ? 'Retry'
                          : `Send to ${DEFAULT_RECIPIENT}`}
                  </button>
                </div>
              </div>
            </article>

            <article className="notification-item notification-item-info">
              <div className="notification-header">
                <span className="notification-op">
                  Operation: Shipment C (High risk – no auto send)
                </span>
                <span className="risk-pill risk-high">High</span>
              </div>
              <p className="notification-meta">
                Shipment C is currently classified as high risk due to overlapping storm
                systems and geopolitical disruptions. Suggested mitigations and any
                external communication templates are shown in the human-in-the-loop
                actions panel and require operator approval before sending.
              </p>
            </article>
          </div>
        </div>

        <div className="chat-panel ai-panel">
          <div className="chat-header">
            <h2>💬 Resilience Copilot</h2>
            <p>
              Query risks, lanes, and scenarios. Responses are based on current supply chain
              intelligence (routes, risk zones, weather).
            </p>
          </div>

          <div className="chat-messages">
            {chatMessages.map((m, i) => (
              <div
                key={i}
                className={`chat-message ${m.role === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="chat-avatar">{m.role === 'user' ? 'U' : 'AI'}</div>
                <div className="chat-bubble">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{m.text}</p>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="chat-message assistant">
                <div className="chat-avatar">AI</div>
                <div className="chat-bubble">
                  <p>Thinking…</p>
                </div>
              </div>
            )}
          </div>

          <form className="chat-input-row" onSubmit={handleChatSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about a route, region, or risk scenario…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={chatLoading}
            />
            <button
              type="submit"
              className="primary-button chat-send"
              disabled={chatLoading}
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default DashboardTab
