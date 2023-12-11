import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { db } from "../../main";
import Table from "../../tables";
import { verifyUserPassword } from "../functions/verify-user-password";

const Login = (req: Request, res: Response) => {

    const username: string = req.body.username.toLowerCase();
    const password: string = req.body.password;

    if (!username || !password) {
        res.status(200).send({
            message: 'Username or password missing.',
            success: false
        });
        return;
    }

    const table: string = Table.User;
    const user: any = db.prepare(`SELECT * FROM ${ table } WHERE username = ? LIMIT 1`).get(username);

    if (!user) {
        res.status(200).send({
            message: 'User not found.',
            success: false
        });
        return;
    } else {
        const passwordMatch: boolean = verifyUserPassword(password, user.password);

        if (passwordMatch) {
            res.status(200).send({
                message: 'You successfully logged in !',
                success: true,
                id: user.id
            });
            return;
        } else {
            res.status(200).send({
                message: 'Wrong password .',
                success: false
            });
        }
    }
}

export default Login;