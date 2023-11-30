import express, { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Hash } from 'crypto';
dotenv.config();

const db = new Database(__dirname + '\\..\\' +  process.env.DATABASE_NAME);

const app = express();

app.use(express.json(), cors());

app.get('/', (req, res) => {
    const rows = db.prepare('SELECT * FROM USER WHERE id = 1 LIMIT 1');
    res.send(rows.all());
});
app.post('/user/login', (req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username || !password) {
        return res.status(500).send({
            message: 'Username or password missing !',
            success: false
        });
    }

    const rows = db.prepare('SELECT * FROM USER WHERE username = ? LIMIT 1').get(username);

    if (!rows) {
        return res.status(500).send({
            message: 'User not found !',
            success: false
        });
    }
});

app.post('/user/register', (req: Request, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username || !password) {
        return res.status(500).send({
            message: 'Username or password missing !',
            success: false
        });
    }

    if (username.length > 32) {
        return res.status(500).send({
            message: 'Username too long !',
            success: false
        });
    } else if (password.length < 8) {
        return res.status(500).send({
            message: 'Password too short !',
            success: false
        });
    } else if (password.length > 32) {
        return res.status(500).send({
            message: 'Password too long !',
            success: false
        });
    }


    bcrypt.hash(password, 10, (err, hashedPassword: string) => {
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
                    return res.status(500).send({
                        message: 'Username already taken !',
                        success: false
                    });
                } else {
                    return res.status(500).send({
                        message: 'Error while registering',
                        success: false
                    });
                }
            }
        }
    });
});

app.get('*', (req: Request, res: Response) => {
    res.send('Hello New World !');
});


const port: number = Number(process.env.PORT) || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});