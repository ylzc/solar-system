import { All, Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Response, Request } from 'express';

@Controller()
export class ProxyController {
	constructor(
		private readonly proxyService: ProxyService,
	) {
	}

	@All(':id')
	proxy(
		@Req() req: Request,
		@Res() res: Response,
		@Param('id') id: string,
	) {
		this.proxyService.web(res, res, id);
	}
}
