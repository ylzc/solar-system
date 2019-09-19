import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthCheckDto, SetPermissionDto, SetRoleDto } from '@solar-system/planet';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	constructor(private readonly auth: AuthService) {
	}

	@Get('check')
	async check(@Query() auth: AuthCheckDto) {
		return await this.auth.enforce(auth.sub, auth.domain, auth.obj, auth.act);
	}

	@Post('set-permission')
	async setPermission(@Body() auth: SetPermissionDto) {
		return await this.auth.addPolicy(auth.sub, auth.domain, auth.obj, auth.act);
	}

	@Post('set-role')
	async setRole(@Body() auth: SetRoleDto) {
		return await this.auth.addGroupingPolicy(auth.user, auth.role, auth.domain);
	}
}
