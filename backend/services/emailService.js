const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

async function sendRiskAlertEmail(companyEmail, suggestion) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      'EMAIL_USER and EMAIL_PASS environment variables must be set for nodemailer'
    )
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: companyEmail,
    subject: 'Supply Chain Risk Alert',
    text: `
AI Risk Monitoring System Alert

Suggested Action:
${suggestion}

Please review the updated logistics recommendation.

Best,
Autonomous Supply Chain Resilience Agent
`,
  }

  return transporter.sendMail(mailOptions)
}

module.exports = { sendRiskAlertEmail }
