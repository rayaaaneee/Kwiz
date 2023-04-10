import * as express from 'express';
import { Application, Request, Response } from 'express';

const app: Application = express();
const port = 7000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});