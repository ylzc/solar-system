import { HttpInstance } from '../interfaces';

export class SunClient<T extends HttpInstance> {

	private readonly $http: T;

	constructor(http: T) {
		this.$http = http;
	}

	register(AddDto: { prefix: string, target: string }) {
		this.$http.get('/center/add', { params: AddDto });
	}

}
