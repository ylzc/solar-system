import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserEntity } from '@solar-system/planet';
import { TransformClassToPlain } from 'class-transformer';
import * as crypto from 'crypto';

@Injectable()
export class UserService {

	@InjectRepository(UserEntity)
	private readonly user: Repository<UserEntity>;

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

	// @TransformClassToPlain()
	async checkByAccount(account: string, password: string) {
		const user = await this.user.findOne({
			account,
		});
		let err = '';
		if (user) {
			if (this.checkPassword(user, password)) {
				return user;
			} else {
				err = '密码错误';
			}
		} else {
			err = '账号不存在';
		}
		throw new UnauthorizedException(err);
	}

}
