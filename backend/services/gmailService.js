const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

const CREDENTIALS_PATH = path.join(__dirname, '..', 'google_oauth.json')

function loadCredentials() {
  try {
    const raw = fs.readFileSync(CREDENTIALS_PATH, 'utf8')
    const data = JSON.parse(raw)

    // Support a flat shape:
    // { client_id, client_secret, redirect_uri, refresh_token }
    // or the standard Google shapes: { installed: {...} } / { web: {...} }
    const config =
      data.installed || data.web || data

    const { client_id, client_secret, redirect_uris, redirect_uri, refresh_token } = config

    const redirect =
      redirect_uri ||
      (Array.isArray(redirect_uris) && redirect_uris.length > 0 ? redirect_uris[0] : undefined)

    if (!client_id || !client_secret || !redirect || !refresh_token) {
      throw new Error(
        'Missing required OAuth fields in google_oauth.json. Expected client_id, client_secret, redirect_uri(s), and refresh_token.'
      )
    }

    return {
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect,
      refreshToken: refresh_token,
    }
  } catch (err) {
    console.error('Failed to load Google OAuth credentials:', err.message)
    throw err
  }
}

function createOAuthClient() {
  const { clientId, clientSecret, redirectUri, refreshToken } = loadCredentials()

  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  )

  oAuth2Client.setCredentials({ refresh_token: refreshToken })

  return oAuth2Client
}

function createGmailClient() {
  const auth = createOAuthClient()
  return google.gmail({ version: 'v1', auth })
}

function encodeMessage(raw) {
  return Buffer.from(raw)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function sendEmail(to, subject, message) {
  if (!to || !subject || !message) {
    throw new Error('to, subject, and message are required')
  }

  const gmail = createGmailClient()

  const fromAddress = 'me'

  const rawMessage =
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    'Content-Type: text/plain; charset="UTF-8"\r\n' +
    '\r\n' +
    message

  const encodedMessage = encodeMessage(rawMessage)

  try {
    const response = await gmail.users.messages.send({
      userId: fromAddress,
      requestBody: {
        raw: encodedMessage,
      },
    })

    return response.data
  } catch (err) {
    console.error('Error sending Gmail message:', err.response?.data || err.message)
    throw err
  }
}

module.exports = {
  sendEmail,
}

