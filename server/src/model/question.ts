import { Answer } from './answer';

export class Question {
    #id: number;
    #quiz_id: number;
    #question_text: string;
    #is_unique_answer: boolean;
    #answers: Answer[] = [];

    constructor(id: number, question_text: string, is_unique_answer: boolean, quiz_id: number) {
        this.#id = id;
        this.#quiz_id = quiz_id;
        this.#question_text = question_text;
        this.#is_unique_answer = is_unique_answer;
    }

    get id(): number {
        return this.#id;
    }

    get quiz_id(): number {
        return this.#quiz_id;
    }

    get question_text(): string {
        return this.#question_text;
    }

    get is_unique_answer(): boolean {
        return this.#is_unique_answer;
    }

    get answers(): Answer[] {
        return this.#answers;
    }

    set answers(answers: Answer[]) {
        this.#answers = answers;
    }

    pushAnswer(answer: Answer): void {
        this.#answers.push(answer);
    }

    toJSON(): any {
        return {
            id: this.#id,
            quiz_id: this.#quiz_id,
            question_text: this.#question_text,
            is_unique_answer: this.#is_unique_answer,
            answers: this.#answers.map((answer: Answer) => answer.toJSON()),
        }
    }
}