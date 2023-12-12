import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { db } from "../../main";
import { verifyPassword } from "../../functions/verify-password";
import Table from "../../tables";
import { verifyUserPassword } from "../../functions/verify-user-password";

const SetPassword = (req: Request, res: Response) => {
    const currentPassword: string = req.body.currentPassword;
    const password: string = req.body.password;
    const id: number = parseInt(req.params.id);

    const passwordResponse: {
        message: string,
        success: boolean
    } = verifyPassword(password);

    if (passwordResponse.success === false) {
        res.status(500).send(passwordResponse);
        return;
    }

    const user: any = db.prepare(`SELECT * FROM ${Table.User} WHERE id = ? LIMIT 1`).get(id);

    if (!user) {
        res.status(200).send({
            message: 'User not found',
            success: false
        });
        return;
    }

    if (verifyUserPassword(currentPassword, user.password)) {
        bcrypt.hash(password, 10, (err: Error | undefined, hashedPassword: string) => {
            if (err) {
                res.status(500).send({
                    message: 'Error while hashing password',
                    success: false
                });
                return;
            } else {
                try {
                    const table: string = Table.User;
                    db.prepare(`UPDATE ${table} SET password = ? WHERE id = ?`).run(hashedPassword, id);
    
                    res.status(200).send({
                        message: 'You successfully changed your password',
                        success: true
                    });
                    return;
    
                } catch (e: any) {
                    res.status(200).send({
                        message: 'Error while changing password',
                        success: false
                    });
                    return;
                }
            }
        });
    } else {
        res.status(200).send({
            message: 'Wrong password .',
            success: false
        });
        return;
    }
}

export default SetPassword;