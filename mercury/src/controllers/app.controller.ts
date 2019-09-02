import { Controller, Get, UseGuards, Request, Post, Inject, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AppController {

	@Inject()
	private readonly app: AppService;

	@Inject()
	private readonly auth: AuthService;

	@ApiImplicitBody({ name: 'login', type: Object })
	@UseGuards(AuthGuard('local'))
	@Post('validate')
	async validate(@Request() req) {
		console.log(req.user);
		return this.auth.login(req.user);
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('check')
	async check(@Request() req) {
		return req.user;
	}

}
