import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import newsRoute from './routes/news.route';
import { Request, Response, NextFunction } from 'express';


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/news', newsRoute);
//error handling
app.use((err: Error, req:Request, res: Response, next:NextFunction) => {
    console.log('hello nepal');
    // res.status(err.status || 500).json({
    //     error: {
    //         message: err.message
    //     }
    // });
});

// app.use()

const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))