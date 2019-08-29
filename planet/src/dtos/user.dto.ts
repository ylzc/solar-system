import { SexEnum } from '../enums';
import { ContactDto } from './contact.dto';
import {
	IsEmail, IsEnum, IsMilitaryTime, IsMobilePhone, IsNumber, IsNumberString, IsOptional, Length,
	Max, MaxLength, Min, MinLength, Validate,
} from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsIdCard } from '../validates/IsIdCard';
import { AddressDto } from './address.dto';
import { EndowmentDto } from './endowment.dto';
import { Expose } from 'class-transformer';

export class UserDto {

	@ApiModelPropertyOptional()
	@Expose()
	readonly id?: string;

	@ApiModelPropertyOptional()
	@MaxLength(20)
	@MinLength(6)
	@IsOptional()
	@Expose()
	readonly account?: string;

	@ApiModelPropertyOptional()
	@IsMobilePhone(null)
	@IsOptional()
	@Expose()
	readonly phoneAccount?: string;

	@ApiModelPropertyOptional()
	@IsEmail()
	@IsOptional()
	@Expose()
	readonly emailAccount?: string;

	@ApiModelPropertyOptional()
	@Expose()
	readonly name?: string;

	@ApiModelProperty()
	@Expose()
	readonly firstName: string;

	@ApiModelProperty()
	@Expose()
	readonly lastName: string;

	@ApiModelPropertyOptional()
	@MaxLength(20)
	@MinLength(8)
	@IsOptional()
	@Expose()
	password?: string;

	@ApiModelPropertyOptional()
	@Validate(IsIdCard, {
		message: '身份证号异常',
	})
	@Expose()
	readonly idCardNumber?: string;

	@ApiModelPropertyOptional({
		type: [AddressDto],
	})
	@Expose()
	readonly addressList?: AddressDto[];

	@ApiModelPropertyOptional({
		type: [ContactDto],
	})
	@Expose()
	readonly contacts?: ContactDto[];

	@ApiModelPropertyOptional({
		type: [EndowmentDto],
	})
	@Expose()
	readonly endowments?: EndowmentDto[];

	@ApiModelPropertyOptional()
	@Expose()
	readonly description?: string;

	@ApiModelPropertyOptional()
	@Expose()
	readonly remarks?: string;

	@ApiModelPropertyOptional({
		type: [String],
	})
	@Expose()
	readonly tags?: string[];

	@ApiModelPropertyOptional()
	@Expose()
	readonly photo?: string;

	@ApiModelPropertyOptional()
	@Expose()
	readonly nickname?: string;

	@ApiModelProperty({
		enum: SexEnum,
		default: SexEnum.unknown,
	})
	@IsEnum(SexEnum)
	@Expose()
	readonly sex: SexEnum;

	@ApiModelPropertyOptional()
	@Min(1)
	@IsNumber()
	@IsOptional()
	@Expose()
	readonly ags?: number;

	@ApiModelPropertyOptional()
	@Min(0)
	@IsNumber()
	@IsOptional()
	@Expose()
	readonly birthday?: number;

}
