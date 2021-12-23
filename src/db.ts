import configuration from './knexfile';
import knex,{ Knex } from 'knex'

export default knex(configuration as Knex.Config);