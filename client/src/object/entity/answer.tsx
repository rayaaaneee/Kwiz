export class Answer {

    id: number | undefined;
    answer_text: string;
    is_ok: boolean;

    constructor(name: string, isAnswer: boolean) {
        this.answer_text = name;
        this.is_ok = isAnswer;
    }

    static copy(source: Answer | any): Answer {
        if (source instanceof Answer) {
            return new Answer(source.answer_text, source.is_ok);
        }
        return new Answer('', true);
    }
}