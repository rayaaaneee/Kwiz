import { Question } from "./question";

export class Quiz {

    theme: string | undefined;
    questions: Question[] = [];

    setTheme(theme: string): void {
        this.theme = theme;
    }

    getNumberOfQuestions(): number {
        return this.questions.length;
    }

    addQuestion(question: Question): void {
        this.questions.push(question);
    }

    static copy(source: Quiz): Quiz {
        let quiz = new Quiz();
        quiz.theme = source.theme;
        quiz.questions = source.questions.map(question => Question.copy(question));
        return quiz;
    }
}