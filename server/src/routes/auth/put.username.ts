import { Request, Response } from "express";
import { db } from "../../main";
import { verifyUsername } from "./functions/verify-username";
import Table from "../../tables";

const SetUsername = (req: Request, res: Response) => {

    const username: string = req.body.username.toLowerCase();
    const id: number = parseInt(req.params.id);
    const usernameResponse: {
        message: string,
        success: boolean
    } = verifyUsername(username);

    if (usernameResponse.success === false) {
        return res.status(500).send(usernameResponse);
    }

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
}

export default SetUsername;