export class Friendship {
    constructor(
        private user1_id:string,
        private user2_id:string
    ){}

    public getUser1Id () {
        return this.user1_id
    }
    
    public getUser2Id () {
        return this.user2_id
    }
}