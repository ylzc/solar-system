import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class PhoneDto {

	id?: number;

	@IsPhoneNumber(null)
	@IsNotEmpty()
	number: string;

	@IsString()
	description: string;

}
