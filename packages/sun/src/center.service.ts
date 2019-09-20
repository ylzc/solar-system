import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientRedis } from '@nestjs/microservices';
import { REDIS_MICRO_CLIENT, REFRESH_CONFIG, RegisterServiceDto } from '@solar-system/planet';

@Injectable()
export class CenterService {

	constructor(
		@Inject(REDIS_MICRO_CLIENT)
		private readonly client: ClientRedis,
	) {
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
