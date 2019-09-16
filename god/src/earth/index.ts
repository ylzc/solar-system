import { UserDto, UserEntity } from '@solar-system/planet';
import { HttpInstance } from '../interfaces';

export class EarthClient<T extends HttpInstance> {

	constructor(
		private readonly $http: T,
		// tslint:disable-next-line:no-empty
	) {
	}

	addUser<T>(data: UserDto): T {
		return this.$http.post('/user/add', data);
	}

	checkByAccount<T>(data: any): T {
		return this.$http.post('/user/check/account', data);
	}

}
