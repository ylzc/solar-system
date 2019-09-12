import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from '@solar-system/planet';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('auth');
	await app.listen(process.env.PORT || 3536);
	logger.log('Now Moon start on ' + (process.env.PORT || 3536), 'SolarSystem');
}

bootstrap().catch(console.log);
