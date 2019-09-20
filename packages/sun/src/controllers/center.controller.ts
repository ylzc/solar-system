import { All, Controller, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { REFRESH_CONFIG, RegisterServiceDto } from '@solar-system/planet';

@Controller('center')
export class CenterController {

	@EventPattern(REFRESH_CONFIG)
	handleRefreshConfig(config: any) {
	}

	@All('register')
	async register(@Query() params: RegisterServiceDto) {
		return params;
	}
}
