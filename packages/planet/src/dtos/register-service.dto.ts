import { IsNumber, IsOptional, IsString, IsUrl, Validate } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class RegisterServiceDto {

	@IsString()
	@Expose()
	@ApiModelProperty({})
	prefix: string;

	@IsUrl()
	@Expose()
	@ApiModelProperty({})
	target: string;

	@Validate(value => !value || (value => 1 && value <= 100))
	@Expose()
	@ApiModelPropertyOptional({
		default: 100,
	})
	weight?: number;

}
