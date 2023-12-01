export class Answer {
    #id: number;
    #question_id: number;
    #answer_text: string;
    #is_ok: boolean;

    constructor(id: number, question_id: number, answer_text: string, is_ok: boolean) {
        this.#id = id;
        this.#question_id = question_id;
        this.#answer_text = answer_text;
        this.#is_ok = is_ok;
    }

    get id(): number {
        return this.#id;
    }

    get question_id(): number {
        return this.#question_id;
    }

    get answer_text(): string {
        return this.#answer_text;
    }

    get is_ok(): boolean {
        return this.#is_ok;
    }

    toJSON(): any {
        return {
            id: this.#id,
            question_id: this.#question_id,
            answer_text: this.#answer_text,
            is_ok: this.#is_ok,
        }
    }
}