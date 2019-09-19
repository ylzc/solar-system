import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { REFRESH_CONFIG } from '@solar-system/planet';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@EventPattern(REFRESH_CONFIG)
	handleRefreshConfig(data: any) {
		// tslint:disable-next-line:no-console
		console.log(data);
	}

	@MessagePattern('mars.test')
	async test(params: any) {
		// tslint:disable-next-line:no-console
		console.log(params);
		return { message: 'test' };
	}
}
