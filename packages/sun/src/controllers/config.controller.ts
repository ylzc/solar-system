import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ConfigService } from '../services/config.service';
import { SetKeyValueDto } from '@solar-system/planet';

@ApiUseTags('config')
@Controller('center/config')
export class ConfigController {

	@Inject(ConfigService)
	private readonly config: ConfigService;

	@Post('set')
	async set(@Body() params: SetKeyValueDto) {
		return await this.config.setKeyValue(params.key, params.value);
	}

	@Get('all')
	async get() {
		return await this.config.getAll();
	}
}
