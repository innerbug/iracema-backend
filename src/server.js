// Imports
const express = require('express')
const cors = require('cors')

// Internal imports
const { LOGO } = require('./utils/logo')

// Environment
require('dotenv').config()

// Routes
const routes = require('./routes')

// App
const app = express()

// App:Config
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(routes)

// PORT
app.listen(process.env.PORT)

// Start message
console.log('───────────────────────────────')
console.log(`${LOGO}\n`)
console.log('--')
console.log(` NAME         : ${process.env.APP_NAME}`)
console.log(` VERSION      : ${process.env.APP_VERSION}`)
console.log('--')
console.log(` PORT         : ${process.env.PORT}`)
console.log(` ENVIRONMENT  : ${process.env.NODE_ENV}`)
console.log(` DBHOST       : ${process.env.DB_HOST}`)
console.log('--')
console.log(` TOKEN LIFE   : ${process.env.TOKEN_LIFE}`)
console.log(` REFRESH_LIFE : ${process.env.REFRESH_LIFE}`)
console.log('───────────────────────────────')
console.log(` ${new Date().toISOString()}\n`)
