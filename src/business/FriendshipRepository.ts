import { Friendship } from "../model/Friendship"

export interface FriendshipRepository {
    create(friendship: Friendship): Promise<void>
    delete(friendship: Friendship): Promise<number>
}