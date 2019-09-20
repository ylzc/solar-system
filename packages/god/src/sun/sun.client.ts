import { HttpInstance } from '../interfaces';
import { RegisterServiceDto } from '@solar-system/planet';

export class SunClient<T extends HttpInstance> {

	private readonly $http: T;

	constructor(http: T) {
		this.$http = http;
	}

	register<R>(AddDto: RegisterServiceDto): R {
		return this.$http.get('/center/register', { params: AddDto });
	}

}
