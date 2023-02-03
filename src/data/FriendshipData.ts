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
            const result = await FriendshipData.connection(FriendshipData.tableName)
                .where({
                    user1_id: `${friendship['user1_id']}`,
                    user2_id: `${friendship['user2_id']}`
                })
                .del()
            return (result)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}