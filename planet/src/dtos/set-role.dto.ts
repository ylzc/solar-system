import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SetRoleDto {

	@IsString()
	user: string;

	@IsString()
	role: string;

	@IsString()
	@IsOptional()
	@Transform(value => value ? value : null)
	domain: string | null;

}
