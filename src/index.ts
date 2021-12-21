import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());

app.use(cors());

const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))