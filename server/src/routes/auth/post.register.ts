import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import Database from "better-sqlite3";

import { db } from "../../main";


const Register = (req: Request, res: Response) => {
    const username: string = req.body.username.toLowerCase();
    const password: string = req.body.password;

    const MAX_PASSWORD_LENGTH: number = process.env.MAX_PASSWORD_LENGTH ? parseInt(process.env.MAX_PASSWORD_LENGTH) : 100;
    const MIN_PASSWORD_LENGTH: number = process.env.MIN_PASSWORD_LENGTH ? parseInt(process.env.MIN_PASSWORD_LENGTH) : 100;

    const MAX_USERNAME_LENGTH: number = process.env.MAX_USERNAME_LENGTH ? parseInt(process.env.MAX_USERNAME_LENGTH) : 100;

    if (!username || !password) {
        return res.status(500).send({
            message: 'Username or password missing !',
            success: false
        });
    }

    if (username.length > MAX_USERNAME_LENGTH) {
        return res.status(500).send({
            message: 'Username too long !',
            success: false
        });
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        return res.status(500).send({
            message: 'Password too short !',
            success: false
        });
    } else if (password.length > MAX_PASSWORD_LENGTH) {
        return res.status(500).send({
            message: 'Password too long !',
            success: false
        });
    }

    bcrypt.hash(password, 10, (err: Error | undefined, hashedPassword: string) => {
        if (err) {
            return res.status(500).send({
                message: 'Error while hashing password',
                success: false
            });
        } else {
            try {
                let result: Database.RunResult = db.prepare('INSERT INTO USER (username, password) VALUES (?, ?)').run(username, hashedPassword);
                return res.status(200).send({
                    message: 'You successfully registered !',
                    success: true,
                    id: result.lastInsertRowid
                });
            } catch (e: any) {
                if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                    return res.status(200).send({
                        message: 'Username already taken !',
                        success: false
                    });
                } else {
                    return res.status(200).send({
                        message: 'Error while registering',
                        success: false
                    });
                }
            }
        }
    });
}

export default Register;