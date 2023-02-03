import { FriendshipRepository } from "../business/FriendshipRepository"
import { CustomError } from "../error/CustomError"
import { Friendship } from "../model/Friendship"
import { BaseDB } from "./BaseDB"

export class FriendshipData extends BaseDB implements FriendshipRepository {
    private static tableName = "labook_friendship"

    async create(friendship: Friendship): Promise<void> {
        try {
            await FriendshipData.connection(FriendshipData.tableName)
                .insert(friendship)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async delete(friendship: Friendship): Promise<number> {
        try {
            let result = await FriendshipData.connection(FriendshipData.tableName)
                .where({
                    user1_id: `${friendship.getUser1Id()}`,
                    user2_id: `${friendship.getUser2Id()}`
                })
                .del()
            if (result === 0) {
                result = await FriendshipData.connection(FriendshipData.tableName)
                    .where({
                        user1_id: `${friendship.getUser2Id()}`,
                        user2_id: `${friendship.getUser1Id()}`
                    })
                    .del()
            }
            return (result)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}