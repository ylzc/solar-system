import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddressDto {

	@ApiModelPropertyOptional()
	id?: string;

	@ApiModelProperty()
	@IsNotEmpty()
	address: string;

	@ApiModelProperty()
	@IsNotEmpty()
	regionalismCode: string;

	@ApiModelProperty()
	description: string;

}
