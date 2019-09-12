import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@solar-system/planet';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const server = express();
	const app = await NestFactory
		.create<NestExpressApplication>(
			AppModule,
			new ExpressAdapter(server),
			{
				cors: true,
				logger,
			},
		);
	SwaggerModule.setup(
		'api',
		app,
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder()
				.setTitle('Mercury for Token')
				.setDescription('认证')
				.addBearerAuth()
				.build(),
		),
	);
	app.setGlobalPrefix('token');
	await app.listen(process.env.PORT || 3534);
	logger.log('Now Mercury start on ' + (process.env.PORT || 3534), 'Solar-System');
}

bootstrap().catch(console.log);
