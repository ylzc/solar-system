import { UserDto, UserEntity } from '@solar-system/planet';
import { HttpInstance } from '../interfaces/http.instance';

export class EarthClient<T extends HttpInstance> {

	constructor(
		private readonly $http: T,
		// tslint:disable-next-line:no-empty
	) {
	}

	addUser(data: UserDto) {
		return this.$http.post('user/add', data);
	}

	checkByAccount<T>(data: any): T {
		return this.$http.post('user/check/account', data);
	}

}
