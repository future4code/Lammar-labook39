export class User {
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string
    ){}
}

export interface createUserDTO {
    name:string,
    email:string,
    password:string
}