import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { logger } from '@solar-system/planet';

async function bootstrap() {
	const server = express();
	const app = await NestFactory
		.create<NestExpressApplication>(
			ProxyModule,
			new ExpressAdapter(server),
			{
				logger,
			},
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
	await app.listen(3434);
	logger.log('Now Sun is start at 3434', 'SolarSystem');
}

// tslint:disable-next-line:no-console
bootstrap().catch(console.log);
