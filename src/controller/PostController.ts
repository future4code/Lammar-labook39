import { Request, Response } from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { InvalidType } from '../error/PostError'
import { createPostDTO } from '../model/Post'

export class PostController {
    constructor(private postBusiness: PostBusiness){}

    async create(req: Request, res:Response):Promise<void>{
        try {
            const { photo, description, type, authorId } = req.body

            const newPost:createPostDTO = { photo, description, type, authorId }

            if (type.toLowerCase() != "normal" && type.toLowerCase() != "event") {
                throw new InvalidType
            }

            await this.postBusiness.create(newPost)

            res.status(201).send({ message: "Post created." })

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    async getPost(req:Request, res:Response):Promise<void>{
        try {
            const { id } = req.params

            const result = await this.postBusiness.getPost(id)
            res.status(200).send(result)
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}