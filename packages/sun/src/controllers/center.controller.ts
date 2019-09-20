import { All, Controller, Get, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { logger, REFRESH_CONFIG, RegisterServiceDto } from '@solar-system/planet';
import { CenterService } from '../services/center.service';

@Controller('center')
export class CenterController {

	constructor(private readonly center: CenterService) {
	}

	@EventPattern(REFRESH_CONFIG)
	handleRefreshConfig(config: any) {
		logger.log(config);
	}

	@All('register')
	async register(@Query() params: RegisterServiceDto) {
		return params;
	}
}
