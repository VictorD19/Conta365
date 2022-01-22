const express = require('express')
const userRouter = express.Router()
const userController = require("../../controllers/userController")

userRouter.get('/user/:id',userController.getUserById)
userRouter.post('/create-user',userController.createUser)
userRouter.patch('/update-user/:id',userController.updateUser)

module.exports = userRouter