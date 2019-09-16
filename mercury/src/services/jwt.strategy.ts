import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromHeader('refreshtoken'),
			ignoreExpiration: false,
			secretOrKey: 'solar-system',
		});
	}

	async validate(payload: any) {
		return payload;
	}
}
