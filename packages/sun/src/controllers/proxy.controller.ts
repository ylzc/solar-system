import { All, Controller, Get, Inject, Param, Req, Res } from '@nestjs/common';
import { ProxyService } from '../services/proxy.service';
import { Response, Request } from 'express';

@Controller()
export class ProxyController {

	@Inject(ProxyService)
	private readonly proxyService: ProxyService;

	@All(':id')
	proxy(
		@Req() req: Request,
		@Res() res: Response,
		@Param('id') id: string,
	) {
		this.proxyService.web(req, res, id);
	}
}
