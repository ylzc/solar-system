import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
	const server = express();
	const app = await NestFactory
		.create<NestExpressApplication>(
			AppModule,
			new ExpressAdapter(server),
			{},
		)
	;
	const microservice = app.connectMicroservice({
		transport: Transport.REDIS,
		options: {},
	});
	await app.startAllMicroservicesAsync();
	await app.listen(3000);
}

// tslint:disable-next-line:no-console
bootstrap().catch(console.log);
