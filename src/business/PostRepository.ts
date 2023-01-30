import { Post } from "../model/Post"

export interface PostRepository {
    create(user:Post):Promise<void>
    getPost(id:string):Promise<Post[]>
}