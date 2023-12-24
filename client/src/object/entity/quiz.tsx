import { Question, QuestionInterface } from "./question";

export interface QuizInterface {
    id: number | undefined;
    creatorId : number | undefined;
    theme: string | undefined;
    questions: QuestionInterface[];
}

export class Quiz {

    id: number | undefined;
    creatorId : number | undefined;
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
            quiz.creatorId = source.creator_id;
        }
        if (source.id !== undefined) {
            quiz.id = source.id;
        }

        return quiz;
    }

    toJSON(): QuizInterface {
        return {
            theme: this.theme,
            creatorId: this.creatorId,
            id: this.id,
            questions: this.questions.map((question: Question) => question.toJSON())
        }
    }
}