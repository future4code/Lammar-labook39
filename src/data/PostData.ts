import { PostRepository } from "../business/PostRepository"
import { CustomError } from "../error/CustomError"
import { Post } from "../model/Post"
import { BaseDB } from "./BaseDB"

export class PostData extends BaseDB implements PostRepository {
    private static tableName = "labook_posts"

    async create(input:Post):Promise<void> {
        try {
            await PostData.connection(PostData.tableName)
            .insert(input)
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getPost(id:string):Promise<Post[]> {
        try {
            return await PostData.connection(PostData.tableName)
            .select()
            .where("id","=",`${id}`)
        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}