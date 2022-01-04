# The guardian-news

## Setup
- Clone the project
- Run npm install
- Copy content of .env.example to .env
- Create mysql database as named in .env 
- Run npm run knex:seed:run
- Run npm build
- Run npm start

## Packages Used
- Knexjs -> query builder in order to seed news section and fetch news section while quering for news
- winston -> for error logging
- axios -> for fetching news
- redis -> for caching
- express -> node js framework
