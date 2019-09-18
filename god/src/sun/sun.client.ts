import { HttpInstance } from '../interfaces';
import { RegisterServiceDto } from '@solar-system/planet';

export class SunClient<T extends HttpInstance> {

	private readonly $http: T;

	constructor(http: T) {
		this.$http = http;
	}

	register(AddDto: RegisterServiceDto) {
		this.$http.get('/center/add', { params: AddDto });
	}

}
