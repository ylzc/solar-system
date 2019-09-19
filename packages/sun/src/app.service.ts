import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_MICRO_CLIENT, REFRESH_CONFIG } from '@solar-system/planet';

@Injectable()
export class AppService {

	constructor(
		@Inject(REDIS_MICRO_CLIENT)
		private readonly client: ClientProxy,
	) {
	}

	async publishConfig() {
		this.client.emit(REFRESH_CONFIG, {});
	}

}
