const express = require('express')
const financialController = require('../controllers/financialControllesr')
const userController = require('../controllers/userController')
const routes = express.Router()

// user
routes.get('/user/:id',userController.getUserById)
routes.post('/create-user',userController.createUser)
routes.patch('/update-user/:id',userController.updateUser)

// company
routes.get('/finance-total/:userId',financialController.getTotalFinancialMonthAndYear)
routes.delete('/finance/:userId/:financialId',financialController.deleteFinancial)






module.exports = routes