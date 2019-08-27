import { SexEnum } from '../enums';
import { ContactDto } from './contact.dto';
import { IsEnum, IsNumberString, Length, Validate } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsIdCard } from '../validates/IsIdCard';
import { AddressDto } from './address.dto';
import { EndowmentDto } from './endowment.dto';

export class UserDto {

	@ApiModelPropertyOptional()
	readonly id?: string;

	@ApiModelPropertyOptional()
	readonly name?: string;

	@ApiModelProperty()
	readonly firstName: string;

	@ApiModelProperty()
	readonly lastName: string;

	@ApiModelPropertyOptional()
	password: string;

	@ApiModelPropertyOptional()
	@Validate(IsIdCard, {
		message: '身份证号异常',
	})
	readonly idCardNumber?: string;

	@ApiModelPropertyOptional({
		type: [AddressDto],
	})
	readonly addressList?: AddressDto[];

	@ApiModelPropertyOptional({
		type: [EndowmentDto],
	})
	readonly endowments?: EndowmentDto[];

	@ApiModelPropertyOptional({
		type: [ContactDto],
	})
	readonly contacts?: ContactDto[];

	@ApiModelPropertyOptional()
	readonly description?: string;

	@ApiModelPropertyOptional()
	readonly remarks?: string;

	@ApiModelPropertyOptional({
		type: [String],
	})
	readonly tags?: string[];

	@ApiModelPropertyOptional()
	readonly photo?: string;

	@ApiModelPropertyOptional()
	readonly nickname?: string;

	@ApiModelProperty({
		enum: SexEnum,
	})
	@IsEnum(SexEnum)
	readonly sex: SexEnum;

}
