import { Request, Response } from "express";
import { db } from "../../main";
import Table from "../../tables";
import Database from "better-sqlite3";

const EditQuiz = async (req: Request, res: Response) => {
    const quiz: any = req.body.quiz;

    const editQuizResult: Database.RunResult = db.prepare(`UPDATE ${Table.Quiz} SET theme = ? WHERE id = ?`).run(quiz.theme, quiz.id);

    if (editQuizResult.changes === 0) {
        res.status(200).send({
            success: false,
            message: "Quiz not found !"
        });
        return;
    }

    quiz.questions.forEach((question: any) => {
        if(question.id === undefined) {
            const insertQuestionResult: Database.RunResult = db.prepare(`INSERT INTO ${Table.Question} (question_text, quiz_id, is_unique_answer) VALUES (?, ?, ?)`).run(question.question_text, quiz.id, question.is_unique_answer ? 1 : 0);

            if (insertQuestionResult.changes === 0) {
                res.status(200).send({
                    success: false,
                    message: "A question was not added !"
                });
                return;
            }
        } else {
            const editQuestionResult: Database.RunResult = db.prepare(`UPDATE ${Table.Question} SET question_text = ?, is_unique_answer = ? WHERE id = ?`).run(question.question_text, question.is_unique_answer ? 1 : 0, question.id);

            if (editQuestionResult.changes === 0) {
                res.status(200).send({
                    success: false,
                    message: "A question was not found !"
                });
                return;
            }
        }
    });


    res.status(200).send({
        success: true,
        message: "Quiz successfully updated !"
    });
}

export default EditQuiz;