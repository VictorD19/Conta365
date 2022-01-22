const express = require('express')
const financialRoutes =express.Router() 
const financialController = require('../../controllers/financialControllesr')
const multer = require('multer')
const upload = multer()

financialRoutes.get('/finance-total/:userId',financialController.getTotalFinancialMonthAndYear)
financialRoutes.delete('/finance/:userId/:financialId',financialController.deleteFinancial)
financialRoutes.post('/finance/:userId',upload.single('file'),financialController.setFinancialData)

module.exports = financialRoutes