import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { UserService } from './services/user.service';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			entities,
			username: 'postgres',
			// password: '123456',
			// schema: 'earth-user',
			// database: 'solar-system',
			database: 'postgres',
			synchronize: true,
		}),
		TypeOrmModule.forFeature(entities),
	],
	controllers: [UserController],
	providers: [
		UserService,
	],
})
export class UserModule {
}
