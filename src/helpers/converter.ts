import dayjs from 'dayjs';

export type rssJson = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

type objectToXML = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
};

const getRssJson = (item: any): rssJson => {
  return {
    title: item.fields.headline,
    description: item.fields.body,
    link: item.webUrl,
    pubDate: dayjs(item.pubDate).format('ddd DD MMM YYYY HH:mm:ss ZZ'),
  };
};

export const getRssJsonArray = (items: object[]): rssJson[] => {
  return items.map((item) => getRssJson(item));
};

const OBJtoXML = (obj: objectToXML) => {
  let xml = '';
  for (const prop in obj) {
    xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
    if (obj[prop] instanceof Array) {
      for (const array in obj[prop]) {
        xml += '<' + prop + '>';
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += '</' + prop + '>';
      }
    } else if (typeof obj[prop] == 'object') {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : '</' + prop + '>';
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml;
};

export const getJsonXml = (jsonData: {
  title: string;
  description: string;
  items: rssJson[];
}): string => {
  let xml =
    '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel>';
  xml += OBJtoXML({ title: jsonData.title, description: jsonData.description });
  jsonData.items.forEach((item: object) => {
    // const requiredJsonData = getRssJson(item);
    xml += OBJtoXML({ item });
    xml += '</channel></rss>';
  });
  return xml;
};
