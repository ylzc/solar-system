import { HttpModuleOptions } from '@nestjs/common';

export interface SunBootModuleOptions {
	http: HttpModuleOptions;
	baseUrl?: string;
	host?: string;
	port?: string | number;
	sun?: string;
}
