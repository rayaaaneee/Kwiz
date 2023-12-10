import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { db } from "../../main";
import { verifyPassword } from "./functions/verify-password";
import Table from "../../tables";

const SetPassword = (req: Request, res: Response) => {
    const password: string = req.body.password.toLowerCase();
    const id: number = parseInt(req.params.id);

    console.log(password);

    const passwordResponse: {
        message: string,
        success: boolean
    } = verifyPassword(password);

    if (passwordResponse.success === false) {
        return res.status(500).send(passwordResponse);
    }

    bcrypt.hash(password, 10, (err: Error | undefined, hashedPassword: string) => {
        if (err) {
            return res.status(500).send({
                message: 'Error while hashing password',
                success: false
            });
        } else {
            try {
                const table: string = Table.User;
                db.prepare(`UPDATE ${table} SET password = ? WHERE id = ?`).run(hashedPassword, id);

                return res.status(200).send({
                    message: 'You successfully changed your password',
                    success: true
                });

            } catch (e: any) {
                return res.status(200).send({
                    message: 'Error while changing password',
                    success: false
                });
            }
        }
    });
}

export default SetPassword;