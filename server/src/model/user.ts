export class User {
    #id: number;
    #username: string;
    #password: string;
    #public_name: string;

    constructor(id: number, username: string, password: string, public_name: string) {
        this.#id = id;
        this.#username = username;
        this.#password = password;
        this.#public_name = public_name;
    }

    get id(): number {
        return this.#id;
    }

    get username(): string {
        return this.#username;
    }

    get password(): string {
        return this.#password;
    }

    get public_name(): string {
        return this.#public_name;
    }

    toJSON(): any {
        return {
            id: this.#id,
            username: this.#username,
            password: this.#password,
            public_name: this.#public_name,
        }
    }
}