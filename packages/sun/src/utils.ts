export const redisUrl = `redis://${process.env.REDIS_HOST || 'redis-server'}:${process.env.REDIS_PORT || 6379}`;
