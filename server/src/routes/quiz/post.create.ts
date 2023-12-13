import { Request, Response } from "express";
import { db } from "../../main";
import Database from "better-sqlite3";
import Table from "../../tables";

const CreateQuiz = async (req: Request, res: Response) => {
    const quiz: any = req.body.quiz;
    const creator_id: number = parseInt(req.body.creator_id);

    if (quiz.questions.length === 0) {
        return res.status(200).json({ 
            success: false,
            message: "Quiz must have at least one question" 
        });
    }

    quiz.questions.forEach((question: any) => {
        if (question.answers.length === 0) {
            return res.status(200).json({ 
                success: false,
                message: "Question must have at least one answer" 
            });
        }
    });

    const table_quiz: string = Table.Quiz;
    const quizResult: Database.RunResult = db.prepare(`INSERT INTO ${table_quiz} (creator_id, theme) VALUES (?, ?)`).run(creator_id, quiz.theme);

    if (quizResult.changes === 0) {
        return res.status(200).json({ 
            success: false,
            message: "Error while creating quiz" 
        });
    } else if (quizResult.lastInsertRowid) {

        const quizId: number | bigint = quizResult.lastInsertRowid;
        const questions: any[] = quiz.questions;
        const table_question: string = Table.Question;

        questions.forEach((question: any) => {

            const isUniqueAnswer: boolean = Boolean(question.is_unique_answer);

            const questionResult: Database.RunResult = db.prepare(`INSERT INTO ${ table_question } (quiz_id, question_text, is_unique_answer) VALUES (?, ?, ?)`).run(quizId, question.question_text, isUniqueAnswer ? 1 : 0);

            if (questionResult.changes === 0) {

                return res.status(200).json({ 
                    success: false,
                    message: "An error has occurred while creating the quiz."
                });

            } else {

                if (questionResult.lastInsertRowid) {

                    const questionId: number | bigint = questionResult.lastInsertRowid;
                    const answers: any[] = question.answers;
                    const table_answer: string = Table.Answer;

                    answers.forEach((answer: any) => {

                        const is_ok: boolean = Boolean(answer.is_ok);

                        const answerResult: Database.RunResult = db.prepare(`INSERT INTO ${ table_answer } (question_id, answer_text, is_ok) VALUES (?, ?, ?)`).run(questionId, answer.answer_text ,is_ok ? 1 : 0);

                        if (answerResult.changes === 0) {

                            return res.status(200).json({ 
                                success: false,
                                message: "An error has occurred while creating the quiz."
                            });

                        }
                    });
                }
            }
        });

        return res.status(200).json({ 
            success: true,
            message: "Quiz successfully created!"
        });
    } else {
        return res.status(200).json({ 
            success: false,
            message: "An error has occurred while creating the quiz."
        });
    }
}

export default CreateQuiz;