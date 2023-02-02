import { CustomError } from "../error/CustomError"
import { FriendshipNotFound } from "../error/FriendshipError"
import { Friendship } from "../model/Friendship"
import { FriendshipRepository } from "./FriendshipRepository"

export class FriendshipBusiness {
    constructor(private friendshipData: FriendshipRepository) { }

    async create(input: Friendship): Promise<void> {
        try {
            const userOneId: string = input['user1_id']
            const userTwoId: string = input['user2_id']

            const newFriendship = new Friendship(userOneId, userTwoId)

            await this.friendshipData.create(newFriendship)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async delete(input: Friendship): Promise<void> {
        try {
            const userOneId: string = input['user1_id']
            const userTwoId: string = input['user2_id']

            const friendship = new Friendship(userOneId, userTwoId)

            const result = await this.friendshipData.delete(friendship)

            if (result === 0) {
                throw new FriendshipNotFound
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}