import { Request } from 'express';
import { axiosGet } from './../helpers/axios';
import { getJsonXml, getRssJsonArray, rssJson } from './../helpers/converter';
import db from '../db';
import CacheService from './cache.service';
import { ErrorException } from './../error-handler/error-exception';

type finalRssJson = {
  title: string;
  description: string;
  items: rssJson[];
};

export default class NewsService {
  cacheService: any;
  constructor() {
    this.cacheService = new CacheService();
  }

  async getNews(req: Request): Promise<string | finalRssJson> {
    const url = 'https://content.guardianapis.com/search';
    const section = req.params.section;
    if (!(await this.checkValidSection(section))) {
      throw new ErrorException(
        'BadRequest',
        `Section name should only consists hyphen and alphabets and should start and end with alphabet.`,
      );
    }
    if (!(await this.checkSectionAvailability(section))) {
      throw new ErrorException(
        'NotFound',
        `Section ${section} is not available.`,
      );
    }

    let finalJson = {} as finalRssJson;
    const page: any = req.query?.page ?? 1;
    if ((await this.cacheService.checkNewsInCache(`${section}_${page}`))) {
      finalJson = JSON.parse(
        await this.cacheService.getNewsFromCache(`${section}_${page}`),
      );
    } else {
      const response = await axiosGet(url, {
        q: section,
        page: page,
        'show-fields': 'all',
      });
      finalJson = {
        title: `${section.toUpperCase()} | The Guardian`,
        description: section,
        items: getRssJsonArray(response.data.response.results),
      };
      this.cacheService.storeNewsInCache(
        `${section}_${page}`,
        JSON.stringify(finalJson),
      );
    }
    if (
      req.headers?.accept === 'application/rss+xml' ||
      req.headers?.accept === 'application/xml'
    ) {
      return getJsonXml(finalJson);
    }
    return finalJson;
  }

  async checkValidSection(section: string) {
    const regex = /^[a-zA-Z]([a-zA-Z-]*[a-zA-Z])?$/;
    return regex.test(section);
  }

  async checkSectionAvailability(section: string) {
    const validSections = await db('news_sections').pluck('slug');
    return validSections.includes(section);
  }

  async getNewsSection() {
    const response = await axiosGet(
      'https://content.guardianapis.com/sections',
    );
    return response.data.response.results;
  }
}
