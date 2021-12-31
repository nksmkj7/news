import { Request, Response, NextFunction } from 'express';
import axios from 'axios'
import NewsService  from './../services/news.service';

export const newsController= {
    getNews: async (req: Request, res: Response, next: NextFunction) => {
        let contentType = req.headers?.accept && req.headers?.accept === 'application/rss+xml' || req.headers?.accept === 'application/xml' ? req.headers.accept : 'application/json';
        return res.status(200).set('Content-Type', contentType).send(await new NewsService().getNews(req));
    }   
}