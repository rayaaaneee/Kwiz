import { Request, Response } from "express";
import { db } from "../../main";
import Table from "../../tables";

const SearchQuiz = async (req: Request, res: Response) => {
    const theme: string = (req.params.theme as string).toLowerCase();
    const currentUserId: number = parseInt(req.params.userid as string);

    console.log(currentUserId);

    try {
        const rows: any = db.prepare(`
            SELECT K.*, COUNT(Q.id) as nbQuestions FROM ${ Table.Quiz } K
            INNER JOIN ${ Table.Question } Q ON K.id = Q.quiz_id
            WHERE lower(theme) LIKE ? AND creator_id != ? 
            GROUP BY K.id
        `).all(`%${theme.toLowerCase()}%`, currentUserId);

        res.status(200).send({
            message: 'Successfully searched for the quizes !',
            success: true,
            quizzes: rows
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(200).send({
            success: false,
            message: 'An error occurred while searching for the quiz. Please try again later.'
        });
        return;
    }
}

export default SearchQuiz;