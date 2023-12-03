import { Request, Response } from 'express';
import { db } from '../../main';

const UserQuizzes = (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);

    const rows: any = db.prepare(`
        SELECT K.*, COUNT(Q.id) AS nbQuestions
        FROM Quiz K
        INNER JOIN Question Q ON K.id = Q.quiz_id
        WHERE K.creator_id = ?
        GROUP BY K.id;
    `).all(userId);

    return res.status(200).send({
        success: true,
        quizzes: rows,
    });
}

export default UserQuizzes;