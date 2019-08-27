import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import express = require('express');
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
	const server = express();
	const logger = new Logger();
	const app = await NestFactory
		.create<NestExpressApplication>(
			UserModule,
			new ExpressAdapter(server),
			{
				cors: true,
				logger: logger,
			},
		);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	SwaggerModule.setup(
		'api',
		app,
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder()
				.setTitle('Earth fro user')
				.setDescription('人员及关系管理')
				.addBearerAuth()
				.build(),
		),
	);
	await app.listen(3535);
	logger.log('Now Earth start on 3535');
};

bootstrap().catch(console.log);
