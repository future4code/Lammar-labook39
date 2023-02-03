import { CustomError } from "../error/CustomError"
import { FriendshipNotFound } from "../error/FriendshipError"
import { Friendship } from "../model/Friendship"
import { FriendshipRepository } from "./FriendshipRepository"

export class FriendshipBusiness {
    constructor(private friendshipData: FriendshipRepository) { }

    async create(newFriendship: Friendship): Promise<void> {
        try {
            await this.friendshipData.create(newFriendship)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async delete(friendship: Friendship): Promise<void> {
        try {
            const result = await this.friendshipData.delete(friendship)

            if (result === 0) {
                throw new FriendshipNotFound
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}