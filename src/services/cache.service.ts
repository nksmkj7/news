import redisConnection from '../helpers/redis';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: __dirname + '/../.env' });
}

export default class CacheService {
  async storeNewsInCache(key: string, value: string) {
    let expireTime = 600;
    if (process.env.CACHE_EXPIRE_TIME) {
      expireTime = parseFloat(process.env.CACHE_EXPIRE_TIME);
    }
    const client = await redisConnection();
    await client.set(key, value, { EX: expireTime, NX: true });
  }

  async checkNewsInCache(key: string) {
    const client = await redisConnection();
    return !!(await client.get(key));
  }

  async getNewsFromCache(key: string) {
    const client = await redisConnection();
    return await client.get(key);
  }
}
