import { Request, Response } from 'express';
import { db } from '../../main';
import Table from '../../tables';

const UserQuizzes = (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);

    const table_quiz: string = Table.Quiz;
    const table_question: string = Table.Question;

    const rows: any = db.prepare(`
        SELECT K.*, COUNT(Q.id) AS nbQuestions
        FROM ${table_quiz} K
        INNER JOIN ${table_question} Q ON K.id = Q.quiz_id
        WHERE K.creator_id = ?
        GROUP BY K.id;
    `).all(userId);

    return res.status(200).send({
        success: true,
        quizzes: rows,
    });
}

export default UserQuizzes;