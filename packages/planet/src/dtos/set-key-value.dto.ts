import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class SetKeyValueDto {

	@IsString()
	@Expose()
	@ApiModelProperty()
	key: string;

	@IsNotEmpty()
	@Expose()
	@ApiModelProperty({
		type: String,
	})
	value: number | string;

}
