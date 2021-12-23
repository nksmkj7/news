import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import newsRoute from './routes/news.route';


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/news', newsRoute);
// app.use()

const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))