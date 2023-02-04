import { FriendshipRepository } from "../business/FriendshipRepository"
import { CustomError } from "../error/CustomError"
import { Friendship } from "../model/Friendship"
import { Post } from "../model/Post"
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

    async getFeed(id: string): Promise<Post[]> {
        try {
            // const friendshipsFound = await this.findFriendships(id)
            // // console.log(friendshipsFound.length);
            // if (friendshipsFound.length === 0) {
            //     return []
            // }
            
            const feedFirstHalf = await FriendshipData.connection
                .raw(`SELECT P.id, P.photo, P.description, P.type, P.created_at
                FROM labook_posts P JOIN labook_friendship F
                ON P.author_id = F.user2_id
                WHERE F.user1_id = "${id}"
                ORDER BY P.created_at;
            `)

            const feedSecondHalf = await FriendshipData.connection
                .raw(`SELECT P.id, P.photo, P.description, P.type, P.created_at
                FROM labook_posts P JOIN labook_friendship F
                ON P.author_id = F.user1_id
                WHERE F.user2_id = "${id}"
                ORDER BY P.created_at;
            `)

            const feedComplete = feedFirstHalf[0].concat(feedSecondHalf[0])
            
            return feedComplete
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    // async findFriendships(id:string):Promise<Friendship[]>{
    //     try {
    //         const result = await FriendshipData.connection
    //         .raw(`SELECT * FROM labook_friendship F1
    //             WHERE F1.user1_id = "${id}"
    //             OR F1.user2_id = "${id}";
    //         `)
    //         // console.log(result[0]);
            
    //         return result[0]
    //     } catch (error:any) {
    //         throw new CustomError(error.statusCode, error.message)
    //     }
    // }
}