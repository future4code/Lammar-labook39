import { CustomError } from "../error/CustomError"
import { PostRepository } from "./PostRepository"
import { createPostDTO, Post } from "../model/Post"
import { IdGenerator } from "../services/IdGenerator"
import { PostNotFound } from "../error/PostError"


export class PostBusiness {
    constructor(private postData: PostRepository) { }

    async create(input: createPostDTO): Promise<void> {
        try {
            const { photo, description, type, authorId } = input

            const idGenerator = new IdGenerator()
            const id: string = idGenerator.generateId()

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
            const post = await this.postData.getPost(id)

            if (post.length < 1) {
                throw new PostNotFound
            }

            return post
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}