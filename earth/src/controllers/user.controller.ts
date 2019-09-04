import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get, Param,
	Post, Query,
	UseInterceptors,
} from '@nestjs/common';
import { UserDto, PageDto, CheckAccountDto } from '@solar-system/planet';
import { UserService } from '../services/user.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {

	constructor(private readonly srv: UserService) {
	}

	@Post('add')
	async addUser(@Body() user: UserDto) {
		await this.srv.save(user);
		return {
			result: true,
			code: 200,
			message: '添加人员成功',
		};
	}

	@Get('list')
	async findUserForPage(@Query() params: PageDto) {
		let [list, totalCount] = await this.srv.findUserForPage(params.pageNum, params.pageSize);
		return {
			...params,
			list,
			totalCount,
		};
	}

	@Get(':id')
	async getUserById(@Param('id') id: string) {
		return await this.srv.getUserById(id);
	}

	@Post('/check/account')
	async checkByAccount(@Body() data: CheckAccountDto) {
		return await this.srv.checkByAccount(data.account || data.username, data.password);
	}

	@Post('update')
	async update(@Body() user: UserDto) {
		await this.srv.save(user);
		return await this.srv.getUserById(user.id);
	}

}
