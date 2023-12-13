import { Request, Response } from "express";
import { db } from "../../main";

const SearchQuiz = async (req: Request, res: Response) => {
    const theme: string = req.params.theme;

    try {
        const rows: any = db.prepare(`SELECT * FROM quiz WHERE theme LIKE '%?%'`).all(theme);

        if (rows.length === 0) {
            res.status(200).send({
                success: true,
                message: 'Successfully searched for the quizes !',
                quiz: rows
            });
        }
    } catch (err) {
        res.sendStatus(200).send({
            success: false,
            message: 'An error occurred while searching for the quiz. Please try again later.'
        });
    }
}

export default SearchQuiz;