import { Friendship } from "../model/Friendship"
import { Post } from "../model/Post"

export interface FriendshipRepository {
    create(friendship: Friendship): Promise<void>
    delete(friendship: Friendship): Promise<number>
    getFeed(id: string): Promise<Post[]>
}