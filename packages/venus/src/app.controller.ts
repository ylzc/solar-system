import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@EventPattern('user_created')
	async handleUserCreated(data: Record<string, unknown>) {
		// tslint:disable-next-line:no-console
		console.log(data);
		return 2;
	}
}
