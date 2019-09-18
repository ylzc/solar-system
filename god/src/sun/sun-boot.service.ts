import { HttpService, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { logger } from '@solar-system/planet';
import { SunClient } from './index';
import { AxiosInstance } from 'axios';
import { SunBootModuleOptions } from '../interfaces';

@Injectable()
export class SunBootService implements OnModuleInit {

	// @Inject(HttpService)
	// private readonly $http: HttpService;

	@Inject('SUN_CLIENT_SERVICE')
	private readonly sun: SunClient<AxiosInstance>;

	@Inject('SUN_BOOT_OPTIONS')
	private readonly config: SunBootModuleOptions;

	// constructor() {
	// this.sun = new SunClient<AxiosInstance>(this.$http.axiosRef);
	// }

	async onModuleInit(): Promise<void> {
		logger.log('SUN : ' + (this.config.sun || 'Not Found'), 'SolarSystem');
		if (this.config.sun) {
			try {
				await this.sun.register({
					prefix: 'auth',
					target: `http://${this.config.host || '127.0.0.1'}:${this.config.port || 3536}`,
				});
			} catch (e) {
				logger.error(e.message, 'SolarSystem');
			}
		}
	}

}
