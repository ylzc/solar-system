import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

	constructor(
		private readonly appService: AppService,
	) {
	}

	@Get('publish')
	async publish() {
		this.appService.publishConfig();
		return {};
	}

	@Get('test')
	test() {
		return this.appService.test();
	}
}
