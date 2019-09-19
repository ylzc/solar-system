import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@solar-system/planet';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {

	@Inject()
	private readonly user: UserService;

	@Inject()
	private readonly jwt: JwtService;

	async validateUser(username: string, password: string): Promise<UserEntity> {
		return await this.user.checkByAccount(username, password);
	}

	async login(user: any) {
		const payload = { name: user.name, id: user.id, fullName: user.fullName };
		return {
			accessToken: this.jwt.sign(payload, { expiresIn: '30 days' }),
			refreshToken: this.jwt.sign(user, { expiresIn: '10s' }),
		};
	}
}
