const express = require('express')
const router = express.Router()
const gmailService = require('../services/gmailService')

const TEST_EMAIL_RECIPIENT = process.env.TEST_EMAIL_RECIPIENT || 'your_email@gmail.com'
const TEST_SUBJECT = 'Gmail API Test - Supply Chain AI'
const TEST_MESSAGE =
  'This is a test email sent by the AI Supply Chain Resilience System.'

router.get('/test-email', async (req, res) => {
  console.log('Sending test email...')
  console.log('Recipient:', TEST_EMAIL_RECIPIENT)

  try {
    const result = await gmailService.sendEmail(
      TEST_EMAIL_RECIPIENT,
      TEST_SUBJECT,
      TEST_MESSAGE
    )

    console.log('Email sent successfully')
    console.log('Message ID:', result.id)

    return res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
    })
  } catch (err) {
    console.error('Test email failed:', err.message)
    console.error('Error details:', err.response?.data || err)

    return res.status(500).json({
      success: false,
      error: 'Failed to send test email',
      details: err.response?.data || err.message,
    })
  }
})

module.exports = router
