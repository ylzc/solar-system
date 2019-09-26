import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CenterService } from './center.service';
import * as HttpProxy from 'http-proxy';
import { Response, Request } from 'express';
import { PoolService } from './pool.service';

@Injectable()
export class ProxyService implements OnModuleInit {

	private readonly proxy: HttpProxy;

	@Inject(CenterService)
	private readonly center: CenterService;

	@Inject(PoolService)
	private readonly pool: PoolService;

	constructor() {
		this.proxy = new HttpProxy({ ws: true, changeOrigin: true });
	}

	async onModuleInit(): Promise<any> {
		const list = await this.center.list();
		list.forEach(item => {
			this.pool.setPool(item.prefix, [item]);
		});
		return true;
	}

	private onError(err: Error, req: Request, res: Response, target?: string) {
		res.status(500)
			.json({
				statusCode: 500,
				message: (err ? err.message : null) || '服务器异常',
			});
	}

	web(request: Request, response: Response, id: string, options?: HttpProxy.ServerOptions): void {
		const config: HttpProxy.ServerOptions = options ? options : {};
		config.target = this.pool.next(id);
		request.url = id + request.url;
		try {
			this.proxy.web(request, response, config, this.onError);
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
