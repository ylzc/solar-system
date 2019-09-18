import { IsString, IsUrl } from 'class-validator';

export class RegisterServiceDto {

	@IsString()
	prefix: string;

	@IsUrl()
	target: string;

}
