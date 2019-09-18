import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SunBootModule } from '@solar-system/god';

@Module({
	imports: [
		SunBootModule.register({
			http: {
				baseURL: process.env.SUN,
			},
			host: '172.18.0.127',
			sun: process.env.SUN,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {
}
