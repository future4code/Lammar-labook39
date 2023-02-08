import { CustomError } from "./CustomError"

export class IdentifyUsers extends CustomError {
    constructor() {
        super(400, "Please inform user(s) ID(s).")
    }
}

export class FriendshipNotFound extends CustomError {
    constructor() {
        super(404, "Friendship(s) not found.")
    }
}