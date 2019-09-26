import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const microservice = app.connectMicroservice({
		transport: Transport.REDIS,
		options: {
			url: 'redis://localhost:6379',
		},
	} as RedisOptions);
	await app.startAllMicroservicesAsync();
	await app.listen(3001);
}

// tslint:disable-next-line:no-console
bootstrap().catch(console.log);
