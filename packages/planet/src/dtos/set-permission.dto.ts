import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SetPermissionDto {

	/**
	 * @description 角色或者人员ID
	 */
	@IsString()
	sub: string;

	/**
	 * @description 域
	 */
	@IsString()
	@IsOptional()
	@Transform(value => (value && value !== '') ? value : null)
	domain: string | null;

	@IsString()
	obj: string;

	@IsString()
	act: string;

}
