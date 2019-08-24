import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
	imports: [
		TypeOrmModule
			.forRoot({
				type: 'postgres',
				entities: [
					...entities,
				],
				username: 'postgres',
				password: '',
				schema: 'earth-user',
				database: 'solar-system',
				synchronize: true,
			}),
	],
	controllers: [UserController],
	providers: [],
})
export class UserModule {
}
