const express = require('express')
const financialRoutes = require('./v1/financial.routes')
const userRouter = require('./v1/user.routes')
const routes = express.Router()

routes.use('/v1',[userRouter,financialRoutes])

module.exports = routes