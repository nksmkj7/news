import { Request, Response } from 'express';
import axios from 'axios'
import NewsService  from './../services/news.service';

export const newsController= {
    getNews: async (req: Request, res: Response) => {
        return res.json(await new NewsService().getNews(req)).status(200);
    }   
}