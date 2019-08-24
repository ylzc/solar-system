import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Post,
	UseInterceptors,
} from '@nestjs/common';
import { UserDto } from '@solar-system/planet';
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
		return await this.srv.save(user);
	}

}
