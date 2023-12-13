import { Request, Response } from 'express';
import { db } from '../../main';
import Table from '../../tables';

const GetById = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);

    const table: string = Table.User;
    const row: any = db.prepare(`SELECT username FROM ${table} WHERE id = ?`)
    .get(userId);

    if (!row) {
        return res.status(404).send({
            success: false,
            message: 'User not found',
        });
    }

    return res.status(200).send({
        success: true,
        user: row,
    });
}

export default GetById;