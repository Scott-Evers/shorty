import express from 'express'
import { find } from './lookupDev.js'


const app = express()
const PORT = 5003


app.get('/:token',find)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
