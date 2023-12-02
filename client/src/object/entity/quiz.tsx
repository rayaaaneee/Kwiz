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
        let quiz = new Quiz();
        quiz.theme = source.theme;
        quiz.questions = source.questions.map((question: any) => Question.copy(question));

        if (source.creator_id !== undefined) {
            quiz.creator_id = source.creator_id;
        }
        if (source.id !== undefined) {
            quiz.id = source.id;
        }

        return quiz;
    }
}