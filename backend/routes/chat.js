const express = require('express')
const { tradeRoutes } = require('../data/tradeRoutes')
const { riskZones } = require('../data/riskZones')

const router = express.Router()

// Contextual responses based on project data (can be replaced with LangChain/OpenAI later)
function getChatResponse(userMessage) {
  const msg = (userMessage || '').toLowerCase().trim()
  if (!msg) {
    return 'Please ask a question about supply chain risks, shipping routes, or logistics scenarios.'
  }

  if (msg.includes('route') || msg.includes('lane') || msg.includes('shipping')) {
    const routes = tradeRoutes
      .map((r) => `• ${r.name} (${r.mode}, ${r.carrier}, ${r.shipments} shipments)`)
      .join('\n')
    return `Current trade routes in the system:\n\n${routes}\n\nThese routes are monitored for weather, congestion, and geopolitical risks.`
  }

  if (msg.includes('risk') || msg.includes('danger') || msg.includes('red sea') || msg.includes('suez')) {
    const zones = riskZones
      .map((z) => `• ${z.name}: ${z.risk} risk`)
      .join('\n')
    return `Risk zones currently monitored:\n\n${zones}\n\nHigh-risk areas may require rerouting or delay recommendations.`
  }

  if (msg.includes('weather') || msg.includes('storm') || msg.includes('cyclone')) {
    return 'Pacific cyclone activity is elevated. Consider delaying Western Pacific sailings by 12–24 hours. The Trans-Pacific route (China → Canada) may be affected. Check the map for real-time weather overlays.'
  }

  if (msg.includes('alternative') || msg.includes('reroute')) {
    return 'For Asia–Europe shipments, consider routing via Cape of Good Hope due to Red Sea disruptions. For Pacific routes, temporary holds may reduce storm exposure. See the Human-in-the-loop actions panel for specific recommendations.'
  }

  if (msg.includes('help') || msg.includes('what can')) {
    return 'I can help with:\n• Route and lane information\n• Risk zone status (Red Sea, South China Sea, Panama Canal)\n• Weather and storm impacts\n• Alternative routing suggestions\n\nAsk about any of these topics.'
  }

  return `I've noted your question about "${userMessage}". Based on current supply chain intelligence: Red Sea disruptions remain elevated, Pacific weather shows cyclone risk, and port congestion is emerging at key gateways. Would you like details on a specific route or region?`
}

router.post('/chat', async (req, res) => {
  const { message } = req.body || {}

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid message' })
  }

  try {
    const response = getChatResponse(message)
    return res.json({ response })
  } catch (err) {
    console.error('Chat error:', err.message)
    return res.status(500).json({
      error: 'Failed to process chat',
      details: err.message,
    })
  }
})

module.exports = router
