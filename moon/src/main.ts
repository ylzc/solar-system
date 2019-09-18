import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { logger } from '@solar-system/planet';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
	const server = express();
	const app = await NestFactory
		.create<NestExpressApplication>(
			AuthModule,
			new ExpressAdapter(server),
			{
				logger,
			},
		);
	app.setGlobalPrefix('auth');
	await app.listen(process.env.PORT || 3536);
	logger.log('Now Moon start on ' + (process.env.PORT || 3536), 'SolarSystem');
}

bootstrap().catch(console.log);
