import { Question } from "./question";

export class Quiz {

    id: number | undefined;
    creator_id : number | undefined;
    theme: string | undefined;
    questions: Question[] = [];

    getNumberOfQuestions(): number {
        return this.questions.length;
    }

    replaceQuestion(index: number, question: Question): void {
        this.questions[index] = question;
    }

    addQuestion(question: Question): void {
        this.questions.push(question);
    }

    static copy(source: Quiz | any): Quiz {
        if (source instanceof Quiz) {
            let quiz = new Quiz();
            quiz.theme = source.theme;
            quiz.questions = source.questions.map(question => Question.copy(question));
            return quiz;
        }
        return new Quiz();
    }
}