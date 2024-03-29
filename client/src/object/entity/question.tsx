import { Answer, AnswerInterface } from "./answer";

export interface QuestionInterface {
    id: number | undefined;
    question_text: string;
    is_unique_answer: boolean;
    answers: AnswerInterface[];
}

export class Question {

    id: number | undefined;
    question_text: string;
    is_unique_answer: boolean;
    answers: Array<Answer> = [];


    constructor(name: string, isUniqueAnswer: boolean) {
        this.question_text = name;
        this.is_unique_answer = isUniqueAnswer;
    }

    addAnswer(name: string, isAnswer: boolean) {
        this.answers.push(new Answer(name, isAnswer));
    }

    getNumberOfAnswers() {
        return this.answers.length;
    }

    static copy(source: Question): Question {
        let question = new Question(source.question_text, Boolean(source.is_unique_answer));
        question.answers = source.answers.map((answer: any) => Answer.copy(answer));

        if (source.id !== undefined) {
            question.id = source.id;
        }

        return question;
    }

    toJSON(): QuestionInterface {
        return {
            question_text: this.question_text,
            is_unique_answer: this.is_unique_answer,
            id: this.id,
            answers: this.answers.map((answer: Answer) => answer.toJSON())
        }
    }
}