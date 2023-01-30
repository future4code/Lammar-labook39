export class Post {
    constructor(
        private id:string,
        private photo:string,
        private description:string,
        private type:postType,
        private author_id:string
    ){}
}

export interface createPostDTO {
    photo:string,
    description:string,
    type:postType,
    authorId:string
}

enum postType {
    NORMAL = 'Normal',
    EVENT = 'Event'
}