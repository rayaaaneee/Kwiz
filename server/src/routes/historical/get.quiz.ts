import { Request, Response } from "express";
import Table from "../../tables";
import { db } from "../../main";

const GetQuizHistorical = (req: Request, res: Response) => {

    const quiz_id: number = parseInt(req.params.id);

    let rows: any[];
    let quiz: any;

    try {
        rows = db.prepare(`
            SELECT H.score, U.username, COUNT(Q.id) as maxScore
            FROM ${Table.Hist} H
            INNER JOIN ${Table.User} U ON H.user_id = U.id
            LEFT JOIN ${Table.Quiz} Q ON H.quiz_id = Q.id AND Q.id = ?
            LEFT JOIN ${Table.Question} Ques ON Q.id = Ques.quiz_id
            GROUP BY H.score, U.username, Q.theme
            ORDER BY score DESC;
        `).all(quiz_id);
    } catch (e: any) {
        res.status(200).send({
            success: false,
            error: 'An error occurred while fetching historical data. Please try again later.'
        });
        return;
    }

    try {
        quiz = db.prepare(`
            SELECT theme
            FROM ${Table.Quiz}
            WHERE id = ?;
        `).get(quiz_id);
    } catch (e: any) {
        res.status(200).send({
            success: false,
            error: 'An error occurred while fetching quiz. Please try again later.'
        });
        return;
    }

    res.status(200).send({
        success: true,
        hist: rows,
        theme: quiz.theme
    });
}

export default GetQuizHistorical;