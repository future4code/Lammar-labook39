import { User } from "../model/User"

export interface UserRepository {
    create(user:User):Promise<void>
    getUsers():Promise<User[]>
}