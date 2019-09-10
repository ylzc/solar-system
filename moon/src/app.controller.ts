import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthCheckDto } from '@solar-system/planet';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get('check')
	async check(@Query() auth: AuthCheckDto) {
		return await this.appService.enforce(auth.sub, auth.domain, auth.obj, auth.act);
	}

}
