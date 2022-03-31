import express from 'express'
import cors from 'cors'
import url from './routers/url'
import { validate_token } from './auth'

const app = express()
const PORT = process.env.PORT || 5002
console.log(process.env.PORT)
const API_VERSION = '/api/v0/'

// enable cors for all requests
app.use(cors())

// authentication middleware
app.use(validate_token)

// object routes
app.use(`${API_VERSION}url`, url)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
