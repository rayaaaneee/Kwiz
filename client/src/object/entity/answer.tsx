export class Answer {

    id: number | undefined;
    answer_text: string;
    is_ok: boolean;

    constructor(name: string, isAnswer: boolean) {
        this.answer_text = name;
        this.is_ok = isAnswer;
    }

    static copy(source: Answer): Answer {
        const answer = new Answer(source.answer_text, Boolean(source.is_ok));


        if (source.id !== undefined) {
            answer.id = source.id;
        }

        return answer;
    }
}