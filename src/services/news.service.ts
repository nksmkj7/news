import { Request, Response } from 'express';
import { axiosGet } from './../helpers/axios';
import { getJsonXml,getRssJsonArray,rssJson } from './../helpers/converter';
import db from '../db';

interface finalRssJson {
    title: string,
    description: string,
    items: rssJson[]
}

export default class NewsService {
    async getNews(req: Request) : Promise<string|finalRssJson> {
        const url = "https://content.guardianapis.com/search"
        const section = req.params.section; 
        if (!await this.checkValidSection(section)) { 
            throw new Error(`Section ${section} is not valid`);
        }
        const page:any = req.query?.page ?? 1;
        const response = await axiosGet(url, { q: section, page: page, "show-fields": "all" });
        let finalJson = {title: `${section.toUpperCase()} | The Guardian`,description:section, items: getRssJsonArray(response.data.response.results)}
        if (req.headers?.accept === 'application/rss+xml' || req.headers?.accept === 'application/xml') {
            return getJsonXml(finalJson);
        }
        return finalJson;
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