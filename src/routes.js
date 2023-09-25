// Imports
const express = require('express')
const routes = express.Router()

// Middleware
const auth = require('./middlewares/auth')
const { roles, permissions } = require('./middlewares/roles')

// Controllers
const SessionController = require('./controllers/SessionController')
const UsersController = require('./controllers/UsersController')

// System
routes.get('/sys', (req, res) => {
  console.log(req.route)
  res.send({ name: process.env.APP_NAME, version: process.env.APP_VERSION })
})

// Session
routes.post('/login', SessionController.register)
routes.post('/logout', SessionController.delete)
routes.post('/refresh', SessionController.refresh)

// Users
routes.get(
  '/users',
  auth,
  permissions([roles.ROOT, roles.ADMIN]),
  UsersController.index
)
routes.get(
  '/users/:id',
  auth,
  permissions([roles.ROOT, roles.ADMIN]),
  UsersController.show
)
routes.post(
  '/users',
  auth,
  permissions([roles.ROOT, roles.ADMIN]),
  UsersController.create
)
routes.put(
  '/users/:id',
  auth,
  permissions([roles.ROOT, roles.ADMIN]),
  UsersController.update
)
routes.delete(
  '/users/:id',
  auth,
  permissions([roles.ROOT, roles.ADMIN]),
  UsersController.delete
)

// Export
module.exports = routes
