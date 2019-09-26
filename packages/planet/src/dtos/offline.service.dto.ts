import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OfflineServiceDto {

	@IsString()
	@Expose()
	@ApiModelProperty()
	prefix: string;

	@IsString()
	@Expose()
	@ApiModelProperty()
	target: string;

}
