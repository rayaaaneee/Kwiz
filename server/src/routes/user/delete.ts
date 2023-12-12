import { Request, Response } from 'express';
import { db } from '../../main';
import Table from '../../tables';
import { verifyUserPassword } from '../../functions/verify-user-password';

const DeleteUser = (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    const currentPassword: string = req.body.currentPassword;

    const user: any = db.prepare(`SELECT * FROM ${Table.User} WHERE id = ? LIMIT 1`).get(userId);

    try {
        db.prepare(`
            DELETE FROM ${Table.Answer} WHERE question_id in 
            (SELECT id FROM ${Table.Question} WHERE quiz_id IN 
            (SELECT id FROM ${Table.Quiz} WHERE creator_id = ?))`
        ).run(userId);

        db.prepare(`
            DELETE FROM ${Table.Question} WHERE quiz_id IN 
            (SELECT id FROM ${Table.Quiz} WHERE creator_id = ?)`
        ).run(userId);

        db.prepare(`DELETE FROM ${Table.Quiz} WHERE creator_id = ?`).run(userId);

    } catch (err) {
        res.send({
            success: false,
            message: 'Error while deleting your datas',
        });
    }

    if (!user) {
        res.status(200).send({
            success: false,
            message: 'User not found',
        });
        return;
    } else {
        if (verifyUserPassword(currentPassword, user.password)) {

            const table: string = Table.User;
            const row: any = db.prepare(`DELETE FROM ${table} WHERE id = ?`)
            .run(userId);

            if (row.changes === 0) {
                res.status(200).send({
                    success: false,
                    message: 'User not found',
                });
                return;
            }

            res.status(200).send({
                success: true,
                message: 'User successfully deleted !',
            });
            return;
        } else {
            res.status(200).send({
                success: false,
                message: 'Wrong password',
            });
            return;
        }
    }
}

export default DeleteUser;