import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import { db } from "../../main";

const Login = (req: Request, res: Response) => {

    const username: string = req.body.username.toLowerCase();
    const password: string = req.body.password;

    if (!username || !password) {
        return res.status(200).send({
            message: 'Username or password missing !',
            success: false
        });
    }

    const user: any = db.prepare('SELECT * FROM USER WHERE username = ? LIMIT 1').get(username);

    if (!user) {
        return res.status(200).send({
            message: 'User not found !',
            success: false
        });
    } else {
        bcrypt.compare(password, user.password, (err: Error | undefined, result: boolean) => {
            if (err) {
                return res.status(200).send({
                    message: 'Error while comparing passwords !',
                    success: false
                });
            } else if (result) {
                return res.status(200).send({
                    message: 'You successfully logged in !',
                    success: true,
                    id: user.id
                });
            } else {
                return res.status(200).send({
                    message: 'Wrong password !',
                    success: false
                });
            }
        });
    }
}

export default Login;