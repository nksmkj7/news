import dayjs from 'dayjs';

interface rssJson { 
    title: string;
    description: string;
    link: string;
    pubDate: string;
}

interface objectToXML { 
  [index: string] : any
}


const getRssJson = (item: any): rssJson => { 
      return {
        title: item.fields.headline,
        description: item.fields.body,
        link : item.webUrl,
        pubDate : dayjs(item.pubDate).format('ddd DD MMM YYYY HH:mm:ss ZZ')
      }
}

const OBJtoXML = (obj:objectToXML) =>{
  var xml = '';
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml
}


export const getJsonXml = (jsonData: object[]): string => {
  let xml = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel>';
  jsonData.forEach((item: object) => {
    const requiredJsonData = getRssJson(item);
    xml += OBJtoXML({ item: requiredJsonData });
    xml += "</channel></rss>"
  });
  return xml;
}
