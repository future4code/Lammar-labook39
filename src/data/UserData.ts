import { User } from "../model/User"
import { BaseDB } from "./BaseDB"

export class UserData extends BaseDB {
    private static tableName = "labook_users"

    async create(input:User):Promise<void> {
        await UserData.connection(UserData.tableName)
        .insert(input)
    }
}