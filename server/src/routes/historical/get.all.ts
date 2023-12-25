import { Request, Response } from "express";
import { db } from "../../main";
import Table from "../../tables";

const GetAllHistorical = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userid);

    try {
        const rows: any = db.prepare(`
            SELECT H.date, H.score, U.username, K.theme, COUNT(Q.id) as maxScore FROM ${Table.Hist} H 
            INNER JOIN ${Table.User} U ON H.user_id = U.id
            INNER JOIN ${Table.Quiz} K ON H.quiz_id = K.id
            INNER JOIN ${Table.Question} Q ON K.id = Q.quiz_id
            WHERE H.user_id != ?
            ORDER BY H.date DESC
        `).all(userId);

        res.json({
            success: true,
            historical: rows
        });
        return;
    } catch (err: any) {
        console.log(err);
        res.json({
            success: false,
            message: 'An error occurred while fetching historical'
        });
        return;
    }
}

export default GetAllHistorical;