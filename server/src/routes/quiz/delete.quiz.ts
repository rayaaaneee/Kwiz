import { Request, Response } from 'express';
import { db } from '../../main';
import Table from '../../tables';

const DeleteQuiz = (req: Request, res: Response) => {

    const creator_id: number = parseInt(req.body.creator_id);
    const quiz_id: number = parseInt(req.body.quiz_id);

    const table_quiz: string = Table.Quiz;
    const table_question: string = Table.Question;
    const table_answer: string = Table.Answer;

    const canDelete: boolean = db.prepare(`SELECT * FROM ${table_quiz} WHERE creator_id = ? AND id = ?`).get(creator_id, quiz_id) !== undefined;

    if (canDelete) {
        try {

            db.prepare(`DELETE FROM ${table_answer} WHERE question_id IN (SELECT id FROM ${table_question} WHERE quiz_id = ?)`).run(quiz_id);
            db.prepare(`DELETE FROM ${table_question} WHERE quiz_id = ?`).run(quiz_id);
            db.prepare(`DELETE FROM ${table_quiz} WHERE id = ?`).run(quiz_id);

            return res.status(200).send({
                success: true,
                message: 'Quiz deleted successfully',
            });

        } catch (err) {
            return res.status(500).send({
                success: false,
                message: 'An error occurred while deleting the quiz',
            });
        }
    } else {
        return res.status(403).send({
            success: false,
            message: 'You are not allowed to delete this quiz !',
        });
    }

}

export default DeleteQuiz;