import { Request, Response } from "express";
import Table from "../../tables";
import { db } from "../../main";

const CreateHistorical = (req: Request, res: Response) => {

    const quiz_id: number = parseInt(req.params.id);
    const user_id: number = req.body.user_id;
    const score: number = req.body.score;

    try {
        db.prepare(`
            INSERT INTO ${ Table.Hist}(quiz_id, user_id, score) values (?, ?, ?)
        `).run(quiz_id, user_id, score);

        res.status(200).send({
            success: true,
            message: 'Your score was successfully saved !',
        });
        return;
    } catch (e: any) {
        if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            try {
                db.prepare(`
                    UPDATE ${ Table.Hist } SET score = ? WHERE quiz_id = ? AND user_id = ?
                `).run(score, quiz_id, user_id);

                res.status(200).send({
                    success: true,
                    message: 'Your score was successfully updated !',
                });
                return;
            } catch (e: any) {
                res.status(200).send({
                    success: false,
                    message: 'An error occurred while updating historical'
                });
                return;
            }
        } else {
            res.status(200).send({
                success: false,
                message: 'An error occurred while creating historical'
            });
            return;
        }
    }

}

export default CreateHistorical;