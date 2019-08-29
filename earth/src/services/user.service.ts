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

	async getUserById(id: string) {
		return await this.user.findOne({
			id,
		});
	}

	async findUserForPage(pageNum: number = 1, pageSize: number = 10) {
		let skip = (pageNum > 1 ? pageNum : 1) - 1;
		return await this.user.findAndCount({
			order: {
				name: 'ASC',
				id: 'DESC',
			},
			skip,
			take: pageSize,
		});
	}

}
