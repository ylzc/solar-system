import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientRedis } from '@nestjs/microservices';
import { REDIS_MICRO_CLIENT, REFRESH_CONFIG, RegisterServiceDto } from '@solar-system/planet';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class CenterService {

	@Inject(REDIS_MICRO_CLIENT)
	private readonly client: ClientRedis;

	private readonly redis: Redis;

	constructor(private readonly redisService: RedisService) {
		this.redis = this.redisService.getClient();
	}

	async publishConfig() {
		this.client.emit(REFRESH_CONFIG, {
			test: 1,
		});
	}

	async register(params: RegisterServiceDto) {
		return params;
	}
}
