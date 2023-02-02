import express from 'express'
import { FriendshipBusiness } from '../business/FriendshipBusiness'
import { FriendshipController } from '../controller/FriendshipController'
import { FriendshipData } from '../data/FriendshipData'

export const friendshipRouter = express.Router()

const friendshipData = new FriendshipData()
const friendshipBusiness = new FriendshipBusiness(friendshipData)
const friendshipController = new FriendshipController(friendshipBusiness)

friendshipRouter.post("/create", (req, res) => friendshipController.create(req, res))
friendshipRouter.delete("/delete", (req, res) => friendshipController.delete(req, res))
