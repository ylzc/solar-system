import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '@solar-system/planet';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly user: Repository<UserEntity>,
	) {
	}

	async save(user: UserDto) {
		return await this.user.save(user);
	}

}
