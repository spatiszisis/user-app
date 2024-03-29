import { UserAddress } from "./user-address.model";
import { Gender } from "./gender.enum";

export class User {
    id: number;
    name: string;
    surname: string;
    gender: Gender;
    birthdate: string;
    userAddress?: UserAddress;

    fullName(): string {
        return `${this.name} ${this.surname}`;
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}