import { User } from "../model/User"
import { generateId } from "../services/idGenerator"

export class UserBusiness {

    async create(input:any):Promise<void>{

        const {name, email, password} = input

        const id = generateId()

        const newUser:User = {
            id,
            name,
            email,
            password
        }
        
        // const newUser = new User(
            
        // )
    }
}