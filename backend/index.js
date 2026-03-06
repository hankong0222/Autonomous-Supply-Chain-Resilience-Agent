const express = require('express')
const cors = require('cors')
const path = require('path')

const emailRouter = require('./routes/email')
const testEmailRouter = require('./routes/testEmail')
const alertsRouter = require('./routes/alerts')
const chatRouter = require('./routes/chat')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api', emailRouter)
app.use('/api', testEmailRouter)
app.use('/api', alertsRouter)
app.use('/api', chatRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`)
})

