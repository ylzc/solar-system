import { AxiosStatic } from 'axios';
import { UserDto } from '@solar-system/planet';

export class EarthClient<T extends AxiosStatic> {

	constructor(
		private readonly $http: T,
		// tslint:disable-next-line:no-empty
	) {
	}

	addUser(data: UserDto) {
		return this.$http.post('user/add', data);
	}

}
