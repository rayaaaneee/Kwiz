import { Request, Response } from 'express';
import { db } from '../../main';

const GetAllQuizzes = (req: Request, res: Response) => {
    console.log(req.cookies);

    const rows: any = db.prepare(`
        SELECT K.*, COUNT(Q.id) AS nbQuestions
        FROM Quiz K
        INNER JOIN Question Q ON K.id = Q.quiz_id
        GROUP BY K.id;
    `).all();

    res.status(200).send({
        success: true,
        quizzes: rows
    });
}

export default GetAllQuizzes;