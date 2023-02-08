import { Post } from "../model/Post"

export interface PostRepository {
    create(post:Post):Promise<void>
    getPost(id:string):Promise<Post[]>
}