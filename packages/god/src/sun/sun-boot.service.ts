import { HttpService, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { logger } from '@solar-system/planet';
import { SunClient } from './index';
import { AxiosInstance } from 'axios';
import { PromiseRes, SunBootModuleOptions } from '../interfaces';
import { SUN_BOOT_OPTIONS, SUN_CLIENT_SERVICE } from './constants';

@Injectable()
export class SunBootService implements OnModuleInit {

	@Inject(SUN_CLIENT_SERVICE)
	private readonly sun: SunClient<AxiosInstance>;

	@Inject(SUN_BOOT_OPTIONS)
	private readonly config: SunBootModuleOptions;

	async onModuleInit(): Promise<void> {
		logger.log('SUN : ' + (this.config.sun || 'Not Found'), 'SolarSystem');
		if (this.config.sun) {
			try {
				await this.sun.register<PromiseRes<any>>(this.config.service);
			} catch (e) {
				logger.error(e.message, null, 'SolarSystem');
			}
		}
	}

}
