import { ClientInterface, HttpInstance } from '../interfaces';
import { ValidateUserDto } from '@solar-system/planet';

export class MercuryClient<T extends HttpInstance> {
	private readonly $http: T;

	constructor(http: T) {
		this.$http = http;
	}

	validate(params: ValidateUserDto) {
		return this.$http.post('/token/validate', params);
	}
}
