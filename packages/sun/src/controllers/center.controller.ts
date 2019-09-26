import { All, Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { logger, REFRESH_CONFIG, REFRESH_SERVICE, RegisterServiceDto } from '@solar-system/planet';
import { CenterService } from '../services/center.service';
import { PoolService } from '../services/pool.service';
import { ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';

@ApiUseTags('center')
@Controller('center')
export class CenterController {

	@Inject(CenterService)
	private readonly center: CenterService;

	@Inject(PoolService)
	private readonly pools: PoolService;

	@EventPattern(REFRESH_CONFIG)
	handleRefreshConfig(config: any) {
		logger.log(config);
	}

	@EventPattern(REFRESH_SERVICE)
	handleRefreshService(event: any) {
		this.pools.reSetPool(event.prefix, event.data);
	}

	@Post('register')
	async register(@Body() params: RegisterServiceDto) {
		return this.center.register(params);
	}

	@Get('list')
	async list() {
		return this.center.list();
	}
}
