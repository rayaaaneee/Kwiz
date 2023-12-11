import { Request, Response } from 'express';
import { db } from '../../main';
import Table from '../../tables';

const DeleteUser = (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);

    const table: string = Table.User;
    const row: any = db.prepare(`DELETE FROM ${table} WHERE id = ?`)
    .run(userId);

    if (row.changes === 0) {
        return res.status(404).send({
            success: false,
            message: 'User not found',
        });
    }

    return res.status(200).send({
        success: true,
        message: 'User successfully deleted !',
    });
}

export default DeleteUser;