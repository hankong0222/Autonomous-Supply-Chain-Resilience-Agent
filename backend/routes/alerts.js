const express = require('express')
const { partners } = require('../data/partners')
const { sendRiskAlertEmail } = require('../services/emailService')

const router = express.Router()

router.post('/send-alert', async (req, res) => {
  const { route, suggestion } = req.body || {}

  if (!route || !suggestion) {
    return res.status(400).json({
      error: 'Missing required fields: route, suggestion',
    })
  }

  const company = partners.find((p) => p.route === route)

  if (!company) {
    return res.status(404).json({ error: 'Partner not found' })
  }

  try {
    await sendRiskAlertEmail(company.email, suggestion)
    return res.json({
      success: true,
      message: 'Alert email sent',
      company: company.name,
    })
  } catch (err) {
    console.error('Send alert email failed:', err.message)
    return res.status(500).json({
      error: 'Failed to send alert email',
      details: err.message,
    })
  }
})

module.exports = router
