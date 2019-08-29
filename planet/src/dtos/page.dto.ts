import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class PageDto {

	@ApiModelProperty()
	@Min(1)
	@IsNumber()
	@Transform(value => Number(value))
	readonly pageNum: number;

	@ApiModelProperty()
	@Min(1)
	@IsNumber()
	@Transform(value => Number(value))
	readonly pageSize: number;

}
