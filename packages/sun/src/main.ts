import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const server = express();
	const app = await NestFactory
		.create<NestExpressApplication>(
			ProxyModule,
			new ExpressAdapter(server),
			{},
		)
	;
	const microservice = app.connectMicroservice({
		transport: Transport.REDIS,
		options: {},
	});
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
	}));
	await app.startAllMicroservicesAsync();
	await app.listen(3000);
}

// tslint:disable-next-line:no-console
bootstrap().catch(console.log);
