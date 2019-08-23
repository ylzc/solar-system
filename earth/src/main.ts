import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('user');
	await app.listen(3535);
}

bootstrap().catch(console.log);
