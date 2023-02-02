import { FriendshipRepository } from "../business/FriendshipRepository"
import { CustomError } from "../error/CustomError"
import { Friendship } from "../model/Friendship"
import { BaseDB } from "./BaseDB"

export class FriendshipData extends BaseDB implements FriendshipRepository {
    private static tableName = "labook_friendship"

    async create(input: Friendship): Promise<void> {
        try {
            await FriendshipData.connection(FriendshipData.tableName)
                .insert(input)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async delete(input: Friendship): Promise<number> {
        try {
            const result = await FriendshipData.connection(FriendshipData.tableName)
                .where({
                    user1_id: `${input['user1_id']}`,
                    user2_id: `${input['user2_id']}`
                })
                .del()
            return (result)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}