import { Request, Response } from 'express'
import { FriendshipBusiness } from '../business/FriendshipBusiness'
import { IdentifyUsers } from '../error/FriendshipError'
import { Friendship } from '../model/Friendship'

export class FriendshipController {
    constructor(private friendshipBusiness: FriendshipBusiness) { }

    async create(req: Request, res: Response): Promise<void> {
        try {

            const { userOneId, userTwoId } = req.body

            const newFriendship = new Friendship(userOneId, userTwoId)

            await this.friendshipBusiness.create(newFriendship)

            res.status(201).send({ message: "New friendship created." })

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {

            const { userOneId, userTwoId } = req.body

            const friendship = new Friendship(userOneId, userTwoId)

            await this.friendshipBusiness.delete(friendship)

            res.status(200).send({ message: "Friendship deleted." })

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    // async getFeed(req:Request, res:Response): Promise<void>{
    //     try {
            
    //         const { id } = req.params

    //         // Insert error

    //         const feed = await this.friendshipBusiness.getFeed(id)

    //         res.status(200).send(feed)
    //     } catch (error:any) {
    //         res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    //     }
    // }
}