import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt.strategy';
import { LocalStrategy } from './services/local.strategy';

@Module({
	imports: [
		HttpModule.register({
			baseURL: 'http://127.0.0.1:3030',
		}),
		PassportModule,
		JwtModule.register({
			secret: 'solar-system',
		}),
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
		AuthService,
		UserService,
		JwtStrategy,
		LocalStrategy,
	],
})
export class AppModule {
}
