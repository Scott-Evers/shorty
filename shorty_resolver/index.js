import express from 'express'
import { find } from './lookup.js'


const app = express()
const PORT = 5003


app.get('/:token',await find)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
