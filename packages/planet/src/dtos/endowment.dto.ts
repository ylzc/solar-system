import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class EndowmentDto {

	@ApiModelPropertyOptional()
	id?: string;

	@ApiModelProperty()
	typeId: string;

	@ApiModelProperty()
	rank: string;

}
