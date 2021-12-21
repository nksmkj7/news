import configuration from './knexfile';
import knex,{ Knex } from 'knex'

console.log(configuration)

export const db = knex(configuration as Knex.Config);