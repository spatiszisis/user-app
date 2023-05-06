import { Address } from "./address.model";
import { Gender } from "./gender.enum";

export class User {
    name: string;
    surname: string;
    gender: Gender;
    birthdate: string;
    workAddress?: Address;
    homeAddress?: Address;


    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}