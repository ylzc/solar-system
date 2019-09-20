import { All, Controller, Get, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { logger, REFRESH_CONFIG, REFRESH_SERVICE, RegisterServiceDto } from '@solar-system/planet';
import { CenterService } from '../services/center.service';
import { PoolService } from '../services/pool.service';

@Controller('center')
export class CenterController {

	constructor(
		private readonly center: CenterService,
		private readonly pools: PoolService,
	) {
	}

	@EventPattern(REFRESH_CONFIG)
	handleRefreshConfig(config: any) {
		logger.log(config);
	}

	@EventPattern(REFRESH_SERVICE)
	handleRefreshService(event: any) {
		console.log(event);
		// this.pools.reSetPool(event.prefix, event.data);
	}

	@All('register')
	async register(@Query() params: RegisterServiceDto) {
		return this.center.register(params);
	}
}
