import { Inject, Injectable, Logger } from '@nestjs/common';
import { CenterService } from './center.service';
import * as HttpProxy from 'http-proxy';
import { Response, Request } from 'express';

@Injectable()
export class ProxyService {

	@Inject(CenterService)
	private readonly center: CenterService;

	private readonly proxy: HttpProxy;

	constructor() {
		this.proxy = new HttpProxy({ ws: true, changeOrigin: true });
	}

	private onError(err: Error, req: Request, res: Response, target?: string) {
		res.status(500)
			.json({
				statusCode: 500,
				message: (err ? err.message : null) || '服务器异常',
			});
	}

	web(request: any, response: any, id: string, options?: {}): void {
		const config = options ? options : {};
		try {
			this.proxy.web(
				request,
				response,
				config,
				this.onError,
			);
		} catch (e) {
			Logger.error(e.message, null, 'SolarSystem');
			this.onError(e, request, response);
		}
	}

	ws(req: any, socket: any, head: any, options?: {}): void {
		try {
			const config = options ? options : {};
			this.proxy.ws(req, socket, head, config);
		} catch (e) {
			Logger.error(e.message, null, 'SolarSystem');
		}
	}

}
