const express = require('express')
const router = express.Router()
const gmailService = require('../services/gmailService')

router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body || {}

  if (!to || !subject || !message) {
    return res.status(400).json({
      error: 'Missing required fields: to, subject, message',
    })
  }

  try {
    const result = await gmailService.sendEmail(to, subject, message)
    return res.status(200).json({
      success: true,
      id: result.id,
      threadId: result.threadId,
    })
  } catch (err) {
    console.error('Failed to send email via Gmail API:', err.message)
    const status = err.code && Number.isInteger(err.code) ? err.code : 500
    return res.status(status).json({
      error: 'Failed to send email',
      details: err.response?.data || err.message,
    })
  }
})

module.exports = router

