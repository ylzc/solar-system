import { Inject, Injectable } from '@nestjs/common';
import { REDIS_MICRO_CLIENT } from '@solar-system/planet';
import { ClientRedis } from '@nestjs/microservices';
import { Redis } from 'ioredis';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class ConfigService {

	@Inject(REDIS_MICRO_CLIENT)
	private readonly client: ClientRedis;

	private readonly redis: Redis;

	constructor(private readonly redisService: RedisService) {
		this.redis = this.redisService.getClient();
	}

	async setKeyValue(key: string, value: any) {
		return await this.redis.hset('sun:config:set', key, value);
	}

	async getAll() {
		return await this.redis.hgetall('sun:config:set');
	}
}
