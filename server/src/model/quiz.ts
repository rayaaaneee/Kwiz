import { Question } from './question';

export class Quiz {
    #id: number;
    #creator_id: number;
    #theme: string;
    #questions: Question[] = [];

    constructor(id: number, creator_id: number, theme: string) {
        this.#id = id;
        this.#creator_id = creator_id;
        this.#theme = theme;
    }

    get id(): number {
        return this.#id;
    }

    get creator_id(): number {
        return this.#creator_id;
    }

    get theme(): string {
        return this.#theme;
    }

    get questions(): Question[] {
        return this.#questions;
    }

    set questions(questions: Question[]) {
        this.#questions = questions;
    }

    pushQuestion(question: Question): void {
        this.#questions.push(question);
    }

    toJSON(): any {
        return {
            id: this.#id,
            creator_id: this.#creator_id,
            theme: this.#theme,
            questions: this.#questions.map((question: Question) => question.toJSON()),
        }
    }
}