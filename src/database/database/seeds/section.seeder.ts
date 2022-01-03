import { Knex } from 'knex';
import NewsService from '../../../services/news.service';

type section = {
  id: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  editions: object;
};

export async function seed(knex: Knex): Promise<void> {
  const newsService = new NewsService();
  const sections = await newsService.getNewsSection();

  // Deletes ALL existing entries
  await knex('news_sections').del();

  const sectionArray = sections.map((section: section) => {
    return {
      section: section.webTitle,
      slug: section.id,
    };
  });

  // Inserts seed entries
  await knex('news_sections').insert(sectionArray);
}
