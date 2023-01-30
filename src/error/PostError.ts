import { CustomError } from "./CustomError";

export class InvalidType extends CustomError{
    constructor(){
        super(400, "Inform 'normal' or 'event' for post type.")
    }
}