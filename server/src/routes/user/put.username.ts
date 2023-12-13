import { Request, Response } from "express";
import { db } from "../../main";
import { verifyUsername } from "../../functions/verify-username";
import Table from "../../tables";
import { verifyUserPassword } from "../../functions/verify-user-password";

const SetUsername = async (req: Request, res: Response) => {

    const username: string = req.body.username.toLowerCase();
    const currentPassword: string = req.body.currentPassword;

    const id: number = parseInt(req.params.id);

    const usernameResponse: {
        message: string,
        success: boolean
    } = verifyUsername(username);

    if (usernameResponse.success === false) {
        return res.status(500).send(usernameResponse);
    }

    const user: any = db.prepare(`SELECT * FROM ${Table.User} WHERE id = ? LIMIT 1`).get(id);

    if (!user) {
        return res.status(200).send({
            message: 'User not found',
            success: false
        });
    }

    if (verifyUserPassword(currentPassword, user.password)) {
        try {
            const table: string = Table.User;
            db.prepare(`UPDATE ${table} SET username = ? WHERE id = ?`).run(username, id);

            return res.status(200).send({
                message: 'You successfully changed your username !',
                success: true,
            });
        } catch (e: any) {
            if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return res.status(200).send({
                    message: 'This username is already taken !',
                    success: false
                });
            } else {
                return res.status(200).send({
                    message: 'Error while changing your username !',
                    success: false
                });
            }
        }
    } else {
        return res.status(200).send({
            message: 'Wrong password .',
            success: false
        });
    }
}

export default SetUsername;