import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/jwt.strategy';
import { LocalStrategy } from './services/local.strategy';
import { MorganMiddleware } from '@nest-middlewares/morgan';

@Module({
	imports: [
		HttpModule.register({
			baseURL: 'http://127.0.0.1:3434',
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
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		MorganMiddleware.configure('dev');
		consumer.apply(MorganMiddleware).forRoutes('*');
	}
}
