import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserEntity } from '@solar-system/planet';
import { TransformClassToPlain } from 'class-transformer';
import * as crypto from 'crypto';

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

	@TransformClassToPlain()
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

	checkPassword(user: UserEntity, password: string): boolean {
		return user.password === crypto
			.createHash('md5')
			.update(password + ':' + user.salt)
			.digest('hex');
	}

	@TransformClassToPlain()
	async checkByAccount(account: string, password: string) {
		const user = await this.user.findOne({
			account,
		});
		console.log(user);
		if (this.checkPassword(user, password)) {
			return user;
		} else {
			throw new UnauthorizedException();
		}
	}

}
