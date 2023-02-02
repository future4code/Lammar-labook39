import { CustomError } from "./CustomError"

export class IdentifyUsers extends CustomError {
    constructor() {
        super(400, "Please inform users ID's.")
    }
}

export class FriendshipNotFound extends CustomError {
    constructor() {
        super(404, "Friendship not found.")
    }
}