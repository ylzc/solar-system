import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProxyController } from './controllers/proxy.controller';
import { ProxyService } from './services/proxy.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS_MICRO_CLIENT } from '@solar-system/planet';
import { CenterService } from './services/center.service';
import { PoolService } from './services/pool.service';
import { CenterController } from './controllers/center.controller';
import { RedisModule } from 'nestjs-redis';
import { redisUrl } from './utils';
import { MorganMiddleware } from '@nest-middlewares/morgan';

@Module({
	imports: [
		ClientsModule
			.register([
				{
					name: REDIS_MICRO_CLIENT,
					transport: Transport.REDIS,
					options: {
						url: redisUrl,
					},
				},
			]),
		RedisModule
			.register({
				url: redisUrl,
			}),
	],
	controllers: [
		CenterController,
		ProxyController,
	],
	providers: [
		ProxyService,
		CenterService,
		PoolService,
	],
})
export class ProxyModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		MorganMiddleware.configure('dev');
		consumer.apply(MorganMiddleware).forRoutes('*');
	}
}
