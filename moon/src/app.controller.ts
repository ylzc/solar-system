import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthCheckDto, SetPermissionDto, SetRoleDto } from '@solar-system/planet';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get('check')
	async check(@Query() auth: AuthCheckDto) {
		return await this.appService.enforce(auth.sub, auth.domain, auth.obj, auth.act);
	}

	@Post('set-permission')
	async setPermission(@Body() auth: SetPermissionDto) {
		return await this.appService.addPolicy(auth.sub, auth.domain, auth.obj, auth.act);
	}

	@Post('set-role')
	async setRole(@Body() auth: SetRoleDto) {
		return await this.appService.addGroupingPolicy(auth.user, auth.role, auth.domain);
	}
}
