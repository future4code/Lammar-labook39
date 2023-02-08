import { createUserDTO, User } from "../model/User"
import {
    EmailNotProvided, InvalidEmail,
    NameNotProvided, PasswordNotProvided
} from "../error/UserError"
import { CustomError } from "../error/CustomError"
import { UserRepository } from "./UserRepository"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    constructor(private userData: UserRepository) { }

    async create(input: createUserDTO): Promise<void> {
        try {
            const { name, email, password } = input

            if (!name) {
                throw new NameNotProvided
            }

            if (!email) {
                throw new EmailNotProvided
            }

            if (!password) {
                throw new PasswordNotProvided
            }

            if (!email.includes('@')) {
                throw new InvalidEmail
            }

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generateId()

            const newUser = new User(
                id,
                name,
                email,
                password
            )

            await this.userData.create(newUser)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            return await this.userData.getUsers()
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}