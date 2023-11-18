export class Answer {

    name: string;
    isAnswer: boolean;

    constructor(name: string, isAnswer: boolean) {
        this.name = name;
        this.isAnswer = isAnswer;
    }

    static copy(source: Answer): Answer {
        return new Answer(source.name, source.isAnswer);
    }
}