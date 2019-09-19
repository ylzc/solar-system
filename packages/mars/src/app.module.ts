import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { REDIS_MICRO_CLIENT } from '@solar-system/planet';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: REDIS_MICRO_CLIENT,
				options: {},
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
