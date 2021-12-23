import { Request, Response } from 'express';
import { axiosGet } from './../helpers/axios';
import db  from '../db';

export default class NewsService {
    async getNews(req: Request) {
        const url = "https://content.guardianapis.com/search"
        const section = req.params.section; 
        if (!await this.checkValidSection(section)) { 
            throw new Error(`Section ${section} is not valid`);
        }
        const page:any = req.query?.page ?? 1;
        const response = await axiosGet(url, { q: section, page: page,"show-fields":"all" });
        return response.data.response.results;
    }

    async checkValidSection(section: string) {
        const validSections = await db('news_sections').pluck('slug');
        return validSections.includes(section);
    }

    async getNewsSection() { 
        const response = await axiosGet('https://content.guardianapis.com/sections');
        return response.data.response.results;
    }

}