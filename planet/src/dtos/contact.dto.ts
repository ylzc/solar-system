import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ContactDto {

	@ApiModelPropertyOptional()
	readonly id?: string;

	@ApiModelProperty()
	@IsNotEmpty()
	readonly code: string;

	@ApiModelProperty()
	readonly description: string;

	@ApiModelProperty({})
	@IsNotEmpty()
	readonly type: string;

}
