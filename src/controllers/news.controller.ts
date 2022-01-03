import { Request, Response, NextFunction } from 'express';
import NewsService  from './../services/news.service';

export const newsController= {
    getNews: async (req: Request, res: Response) => {
        let contentType = req.headers?.accept && req.headers?.accept === 'application/rss+xml' || req.headers?.accept === 'application/xml' ? req.headers.accept : 'application/json';
        return res.status(200).set('Content-Type', contentType).send(await new NewsService().getNews(req));
    }   
}