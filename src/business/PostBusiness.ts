import { generateId } from "../services/idGenerator"
import { CustomError } from "../error/CustomError"
import { PostRepository } from "./PostRepository"
import { createPostDTO, Post } from "../model/Post"

export class PostBusiness {
    constructor(private postData: PostRepository) { }

    async create(input: createPostDTO): Promise<void> {
        try {
            const { photo, description, type, authorId } = input

            const id = generateId()

            const newPost = new Post(
                id,
                photo,
                description,
                type,
                authorId
            )

            await this.postData.create(newPost)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getPost(id: string): Promise<Post[]> {
        try {
            return await this.postData.getPost(id)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}