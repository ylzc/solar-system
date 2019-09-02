import { HttpService, Injectable } from '@nestjs/common';
import { UserEntity } from '@solar-system/planet';
import { EarthClient } from '@solar-system/god/src/earth';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
	private readonly earth: EarthClient<HttpService>;

	constructor(private readonly http: HttpService) {
		this.earth = new EarthClient(this.http);
	}

	async checkByAccount(account: string, password: string): Promise<UserEntity> {
		const user = await this.earth
			.checkByAccount<Observable<any>>({
				account,
				password,
			})
			.toPromise();
		console.log(user);
		return user;
	}

}
