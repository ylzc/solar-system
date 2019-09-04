import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '@solar-system/planet';
import { UserService } from './services/user.service';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			entities,
			username: 'postgres',
			// password: '123456',
			schema: 'earth-user',
			database: 'solar-system',
			synchronize: true,
			subscribers: [
				UserSubscriber,
			],
		}),
		TypeOrmModule.forFeature(entities),
	],
	controllers: [
		UserController
	],
	providers: [
		UserService,
	],
})
export class UserModule {
}
