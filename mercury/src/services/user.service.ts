import { HttpException, HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '@solar-system/planet';
import { EarthClient } from '@solar-system/god/src/earth';
import { Observable } from 'rxjs';
import { AxiosInstance, AxiosResponse } from 'axios';
import { PromiseRes } from '@solar-system/god/src/interfaces/http.instance';

@Injectable()
export class UserService {
	private readonly earth: EarthClient<AxiosInstance>;

	constructor(private readonly http: HttpService) {
		this.earth = new EarthClient(this.http.axiosRef);
	}

	async checkByAccount(account: string, password: string) {
		try {
			const { data: user } = await this.earth
				.checkByAccount<PromiseRes<UserEntity>>({
					account,
					password,
				});
			return user;
		} catch (e) {
			if (e.data && e.response) {
				throw new HttpException(e.data.message, e.response.status);
			} else {
				throw e;
			}
		}
	}

}
