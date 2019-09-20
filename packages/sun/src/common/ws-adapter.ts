import { WsAdapter } from '@nestjs/platform-ws';
import { INestApplicationContext } from '@nestjs/common';
import * as wsPackage from 'ws';
import * as httpProxy from 'http-proxy';
import * as url from 'url';
import { EMPTY } from 'rxjs';

export class SocketServer extends WsAdapter {

	private readonly center: any;

	// tslint:disable-next-line:variable-name
	private readonly _parser: any;

	public wsServer: wsPackage.Server;

	constructor(app: INestApplicationContext | any, config?: { center: any, parser: any }) {
		super(app);
		if (config) {
			this.center = config.center;
			this._parser = config.parser;
		}
	}

	parser(request) {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				// tslint:disable-next-line:no-console
				console.log('destroy socket client');
				reject();
			}, 10 * 1000);
			this._parser(request, {}, () => {
				clearTimeout(timer);
				resolve();
			});
		});
	}

	create(port: number, options?: any): any {
		const { server } = options;
		const wsOptions = options;
		if (port === 0 && this.httpServer) {
			const wsServer = this.wsServer = new wsPackage.Server({
				noServer: true,
			});
			const wsProxy = httpProxy.createServer({
				ws: true,
			});
			let appServer = this.httpServer;
			if (this.httpServer.getUnderlyingHttpServer) {
				appServer = this.httpServer.getUnderlyingHttpServer();
			}
			appServer
				.on('upgrade', async (request, socket, head) => {
					try {
						const pathname = url.parse(request.url).pathname;
						await this.parser(request);
						const accessToken = request.session ? request.session.accessToken : '';
						request.headers.accessToken = accessToken || '';
						const target = await this.center.switchWsService(pathname);
						if (target) {
							wsProxy.ws(request, socket, head, { target });
						} else {
							wsServer.handleUpgrade(request, socket, head, (ws) => {
								// @ts-ignore
								ws.req = ws.request = request;
								// @ts-ignore
								ws.session = request.session;
								wsServer.emit('connection', ws, request);
							});
						}
					} catch (e) {
						socket.destory();
						// tslint:disable-next-line:no-console
						console.log(e);
					}
				});
			return this.bindErrorHandler(wsServer);
		}
		if (server) {
			return server;
		} else {
			return this.bindErrorHandler(new wsPackage.Server(Object.assign({ port }, wsOptions)));
		}
	}

	checkEvent(event: any) {
		if (event === ''
			|| event === null
			|| event === undefined
			|| event === false
		) {
			return undefined;
		} else {
			return event;
		}
	}

	bindMessageHandler(buffer, handlers, transform) {
		try {
			let message;
			try {
				message = JSON.parse(buffer.data);
			} catch (e) {
				message = buffer.data;
			}
			if (this.checkEvent(message.event)) {
				const messageHandler = handlers.find(handler => message.event && (handler.message === message.event));
				if (messageHandler) {
					return transform(messageHandler.callback(message.data));
				}
			}
			const others = handlers.find(handler => handler.message === undefined);
			if (others) {
				return transform(others.callback(message));
			} else {
				return EMPTY;
			}
		} catch (e) {
			return EMPTY;
		}
	}

}
