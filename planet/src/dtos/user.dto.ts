import { SexEnum } from '../enums';
import { PhoneDto } from './phone.dto';
import { IsEnum, IsNumberString, Length, Validate } from 'class-validator';

export class UserDto {

	id?: string;

	name?: string;

	firstName: string;

	lastName: string;

	password: string;

	address?: string;

	@IsNumberString()
	regionalismCode?: string;

	@Validate((idCard: any) => {
		return true;
	})
	idCardNumber?: string;

	@Length(5, 11)
	@IsNumberString()
	qq?: string;

	weixin?: string;

	phones?: PhoneDto[];

	description?: string;

	remarks?: string;

	tags?: string[];

	endowments?: any[]; // 资质

	photo?: string;

	nickname?: string;

	@IsEnum(SexEnum)
	sex: SexEnum;

}
