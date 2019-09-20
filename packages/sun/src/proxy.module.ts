import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS_MICRO_CLIENT } from '@solar-system/planet';
import { CenterService } from './center.service';
import { PoolService } from './pool.service';

@Module({
	imports: [
		ClientsModule
			.register([
				{
					name: REDIS_MICRO_CLIENT,
					transport: Transport.REDIS,
				},
			]),
	],
	controllers: [
		ProxyController,
	],
	providers: [
		ProxyService,
		CenterService,
		PoolService
	],
})
export class ProxyModule {
}
