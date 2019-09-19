import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CheckAccountDto {

	@ApiModelProperty({
		required: false,
	})
	@IsString()
	@IsOptional()
	@Expose()
	readonly account?: string;

	@ApiModelProperty({
		required: false,
	})
	@IsString()
	@IsOptional()
	@Expose()
	readonly username?: string;

	@ApiModelProperty()
	@IsString()
	@Expose()
	readonly password: string;

}
