import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'
import { UserData } from '../data/UserData'

export const userRouter = express.Router()

const userData = new UserData()
const userBusiness = new UserBusiness(userData)
const userController = new UserController(userBusiness)

userRouter.post("/create", (req, res) => userController.create(req, res))
userRouter.get("/getusers", (req, res) => userController.getUsers(req, res))