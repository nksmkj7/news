# The guardian-news

## Setup
- Clone the project
- Run npm install
- Copy content of .env.example to .env
- Create mysql database as named in .env 
- Run npm run knex:migrate:latest
- Run npm run knex:seed:run
- Run npm build
- Run npm start

## Packages Used
- Knexjs -> query builder in order to seed news section and fetch news section while quering for news
- winston -> for error logging
- axios -> for fetching news
- redis -> for caching
- express -> node js framework

## System Flow
> After running migration and seeding, sections that are available in 'The Guardian' are stored in database and later it is used to validate the section that the user has requested. <br> The end point is http://localhost:3000/api/news/{{valid-section-name}} if your are running it on local machine and your port is 3000. System cache the news for that section for 10 minutes and serves from cache if requested again. Above mention serves xml if accept type is either application/rss+xml or 'application/xml'. Otherwise it serves json value instead.
