export class User {
    name: string;
    surname: string;
    gender: string;
    birthdate: any;
    workAddress?: string;
    homeAddress?: string;


    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}