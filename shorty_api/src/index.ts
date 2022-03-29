import express from 'express'
import url from './routers/url'
import { validate_token } from './auth'

const app = express()
const PORT = 50000
const API_VERSION = '/api/v0/'


// authentication middleware
app.use(validate_token)

// object routes
app.use(`${API_VERSION}url`, url)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
