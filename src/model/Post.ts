export class Post {
    constructor(
        private id:string,
        private photo:string,
        private description:string,
        private type:postType,
        private createdAt:Date,
        private authorId:string
    ){}
}