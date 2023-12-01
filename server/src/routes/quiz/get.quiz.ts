import { Request, Response } from 'express';
import { db } from '../../main';

import { Quiz } from '../../model/quiz';
import { Question } from '../../model/question';
import { Answer } from '../../model/answer';

const GetQuiz = (req: Request, res: Response) => {
/*     const quizId: number = parseInt(req.params.id);

    const quiz: any = db.prepare(`SELECT * FROM Quiz WHERE id = ?`).get(quizId);

    const questions: any = db.prepare(`SELECT * FROM Question WHERE quiz_id = ?`).all(quizId);

    questions.forEach((question: any) => {
        question.answers = db.prepare(`SELECT * FROM Answer WHERE question_id = ?`).all(question.id);
    });

    return res.status(200).send({
        success: true,
        quiz: quiz,
        questions: questions,
    }); */

    const quizId: number = parseInt(req.params.id);

    const query = `
        SELECT 
            Q.*,
            A.*,
            K.*
        FROM Quiz K
        INNER JOIN Question Q ON K.id = Q.quiz_id
        INNER JOIN Answer A ON Q.id = A.question_id
        WHERE K.id = ?
    `;

    const result: any[] = db.prepare(query).all(quizId);

    console.log(result);
    // Organisez les données en une structure appropriée
    let quiz: Quiz | undefined = undefined;

    result.forEach(row => {
        if (quiz === undefined) {
            quiz = new Quiz(row.id, row.creator_id, row.theme);
        }

        const questionExists: boolean = (quiz.questions.findIndex(
            (q: any) => q.id === row.question_id
        ) !== -1);

        if (!questionExists) {
            const question = new Question(row.question_id, row.question_text, row.is_unique_answer, row.quiz_id);
            quiz.questions.push(question);
        }

        const answer = new Answer(row.answer_id, row.question_id, row.answer_text, row.is_ok);

        quiz.questions.find((q: Question) => (q.id === row.question_id))?.pushAnswer(answer);
    });

    if (quiz !== undefined) {
        return res.status(200).send({
            success: true,
            quiz: (quiz as any)?.toJSON(),
        });
    } else {
        return res.status(404).send({
            success: false,
            message: 'Quiz not found',
        });
    }
}

export default GetQuiz;