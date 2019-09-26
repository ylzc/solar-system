import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SunBootModule } from '@solar-system/god';
import { MorganMiddleware } from '@nest-middlewares/morgan';

@Module({
	imports: [
		SunBootModule.register({
			http: {
				baseURL: process.env.SUN,
			},
			service: {
				prefix: 'auth',
				target: `http://${process.env.HOST || '127.0.0.1'}:${process.env.port || 3536}`,
			},
			sun: process.env.SUN,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		MorganMiddleware.configure('dev');
		consumer.apply(MorganMiddleware).forRoutes('*');
	}
}
