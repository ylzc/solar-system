import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientRedis } from '@nestjs/microservices';
import {
	logger, OfflineServiceDto, REDIS_MICRO_CLIENT, REFRESH_CONFIG,
	REFRESH_SERVICE, RegisterServiceDto,
} from '@solar-system/planet';
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
		logger.log(`Emit ${REFRESH_SERVICE}`, 'SolarSystem');
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
		const data = await this.getSrvConfig(params.prefix);
		this.publishServiceEvent({
			action: 'add',
			prefix: params.prefix,
			data,
		});
		return {
			message: '服务设置成功',
		};
	}

	async offline(params: OfflineServiceDto) {
		const k = 'sun:service:' + params.prefix;
		await this.redis.hdel(k, params.target);
		const len = await this.redis.hlen(k);
		if (len === 0) {
			await this.redis.srem('sun:service:list', params.prefix);
		}
		const data = await this.getSrvConfig(params.prefix);
		this.publishServiceEvent({
			action: 'remove',
			prefix: params.prefix,
			data,
		});
		return {
			message: `${params.prefix}@${params.target}服务已下线`,
		};
	}

	async getSrvConfig(prefix: string) {
		const temp = [];
		const conf = await this.redis.hgetall('sun:service:' + prefix);
		for (const target of Object.keys(conf)) {
			temp.push({ prefix, target, weight: conf[target] });
		}
		return temp;
	}

	async list(): Promise<Array<{ prefix: string, target: string, weight?: number }>> {
		const sevList: string[] = await this.redis.smembers('sun:service:list');
		let temp = [];
		for (let i = 0, l = sevList.length; i < l; i++) {
			temp = temp.concat(await this.getSrvConfig(sevList[i]));
		}
		return temp;
	}
}
