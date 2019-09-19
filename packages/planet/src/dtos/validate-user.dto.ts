import { IsOptional, IsString } from 'class-validator';

export class ValidateUserDto {
	@IsString()
	username: string;
	@IsString()
	password: string;
}
