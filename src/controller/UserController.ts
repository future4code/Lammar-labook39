import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { createUserDTO } from '../model/userDTO'

export class UserController {
    constructor(private userBusiness: UserBusiness){}

    async create(req: Request, res:Response):Promise<void>{
        try {
            const { name, email, password } = req.body

            const newUser:createUserDTO = { name, email, password }

            await this.userBusiness.create(newUser)

            res.status(201).send({ message: "User created." })

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    async getUsers(req:Request, res:Response):Promise<void>{
        try {
            const result = await this.userBusiness.getUsers()
            res.status(200).send(result)
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}