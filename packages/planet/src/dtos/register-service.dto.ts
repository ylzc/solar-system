import { IsNumber, IsOptional, IsString, IsUrl, Validate } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterServiceDto {

	@IsString()
	prefix: string;

	@IsUrl()
	target: string;

	@Validate(value => {
		return !value || (value => 1 && value <= 100);
	})
	weight?: number;

}
