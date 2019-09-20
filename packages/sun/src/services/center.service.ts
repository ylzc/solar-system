import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientRedis } from '@nestjs/microservices';
import { logger, REDIS_MICRO_CLIENT, REFRESH_CONFIG, REFRESH_SERVICE, RegisterServiceDto } from '@solar-system/planet';
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

	async publishServiceEvent(data: any) {
		this.client.emit(REFRESH_SERVICE, data);
	}

	async register(params: RegisterServiceDto) {
		await this.redis.sadd(
			'sun:service:list',
			params.prefix,
		);
		await this.redis.hset(
			'sun:service:' + params.prefix,
			params.target,
			params.weight || 100,
		);
		const temp = await this.redis.hgetall('sun:service:' + params.prefix);
		const data = [];
		for (const k of Object.keys(temp)) {
			data.push({
				prefix: params.prefix,
				target: k,
				weight: temp[k],
			});
		}
		this.publishServiceEvent({
			action: 'add',
			prefix: params.prefix,
			data,
		});
		return {
			message: '服务设置成功',
		};
	}
}
