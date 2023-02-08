import { CustomError } from "./CustomError";

export class NameNotProvided extends CustomError{
    constructor(){
        super(400, "Provide user name.")
    }
}

export class EmailNotProvided extends CustomError{
    constructor(){
        super(400, "Provide email.")
    }
}

export class PasswordNotProvided extends CustomError{
    constructor(){
        super(400, "Provide password.")
    }
}

export class InvalidEmail extends CustomError{
    constructor(){
        super(400, "Invalid email.")
    }
}