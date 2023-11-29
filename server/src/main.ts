import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors(/* {
    origin: 'http://localhost:4200'
} */))

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

const port: number = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});