import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import Database from "better-sqlite3";

import { db } from "../../main";
import { verifyPassword } from "./functions/verify-password";
import { verifyUsername } from "./functions/verify-username";
import Table from "../../tables";


const Register = (req: Request, res: Response) => {
    const username: string = req.body.username.toLowerCase();
    const password: string = req.body.password;

    const passwordResponse: {
        message: string,
        success: boolean
    } = verifyPassword(password);

    if (passwordResponse.success === false) {
        return res.status(500).send(passwordResponse);
    }

    const usernameResponse: {
        message: string,
        success: boolean
    } = verifyUsername(password);

    if (usernameResponse.success === false) {
        return res.status(500).send(usernameResponse);
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
                let result: Database.RunResult = db.prepare(`INSERT INTO ${table} (username, password) VALUES (?, ?)`).run(username, hashedPassword);
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