import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '@solar-system/planet';
import { UserService } from './services/user.service';
import { UserSubscriber } from './subscribers/user.subscriber';
import { MorganMiddleware } from '@nest-middlewares/morgan';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			entities,
			host: process.env.DB_HOST || '127.0.0.1',
			username: 'postgres',
			// password: '123456',
			schema: 'earth-user',
			database: 'solar-system',
			synchronize: true,
			subscribers: [
				UserSubscriber,
			],
		}),
		TypeOrmModule.forFeature(entities),
	],
	controllers: [
		UserController,
	],
	providers: [
		UserService,
	],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		MorganMiddleware.configure('dev');
		consumer.apply(MorganMiddleware).forRoutes('*');
	}
}
