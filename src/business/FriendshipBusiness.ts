import { CustomError } from "../error/CustomError"
import { FriendshipNotFound, IdentifyUsers } from "../error/FriendshipError"
import { Friendship } from "../model/Friendship"
import { FriendshipRepository } from "./FriendshipRepository"

export class FriendshipBusiness {
    constructor(private friendshipData: FriendshipRepository) { }

    async create(newFriendship: Friendship): Promise<void> {
        try {
            if (!newFriendship.getUser1Id() || !newFriendship.getUser2Id()) {
                throw new IdentifyUsers
            }

            await this.friendshipData.create(newFriendship)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async delete(friendship: Friendship): Promise<void> {
        try {

            if (!friendship.getUser1Id() || !friendship.getUser2Id()) {
                throw new IdentifyUsers
            }

            const result = await this.friendshipData.delete(friendship)

            if (result === 0) {
                throw new FriendshipNotFound
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    // async getFeed(id:string):Promise<void> {
    //     try {
    //         const feed = await this.friendshipData.getFeed(id)
    //     } catch (error:any) {
    //         throw new CustomError(error.statusCode, error.message)
    //     }
    // }
}