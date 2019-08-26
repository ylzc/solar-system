import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class IsIdCard implements ValidatorConstraintInterface {

	validate(text: string, validationArguments: ValidationArguments) {
		return true;
	}

}
