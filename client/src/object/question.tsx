import { Answer } from "./answer";

export class Question {

    name: string;
    isUniqueAnswer: boolean;
    answers: Array<Answer> = [];


    constructor(name: string, isUniqueAnswer: boolean) {
        this.name = name;
        this.isUniqueAnswer = isUniqueAnswer;
    }

    addAnswer(name: string, isAnswer: boolean) {
        this.answers.push(new Answer(name, isAnswer));
    }

    getNumberOfAnswers() {
        return this.answers.length;
    }

    static copy(source: Question): Question {
        let question = new Question(source.name, source.isUniqueAnswer);
        question.answers = source.answers.map(answer => { return { name: answer.name, isAnswer: answer.isAnswer } });
        return question;
    }
}