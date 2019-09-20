import { Inject, Injectable } from '@nestjs/common';
import { CenterService } from './center.service';
import * as HttpProxy from 'http-proxy';

@Injectable()
export class ProxyService {

	@Inject(CenterService)
	private readonly center: CenterService;

	private readonly proxy: HttpProxy;

	constructor() {
		this.proxy = new HttpProxy({ ws: true });
	}

	web(request: any, response: any, id: string): void {
		this.proxy.web(
			request,
			response,
			{},
			() => {
			},
		);
	}
}
