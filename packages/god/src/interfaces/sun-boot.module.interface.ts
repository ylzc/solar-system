import { HttpModuleOptions } from '@nestjs/common';
import { RegisterServiceDto } from '@solar-system/planet';

export interface SunBootModuleOptions {
	http: HttpModuleOptions;
	service?: RegisterServiceDto;
	sun?: string;
}
