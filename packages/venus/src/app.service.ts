import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, Client } from '@nestjs/microservices';
import { Transport } from '@nestjs/common/enums/transport.enum';

@Injectable()
export class AppService implements OnModuleInit {

	@Client({ transport: Transport.REDIS })
	private readonly client: ClientProxy;

	async onModuleInit() {
		await this.client.connect();
	}

	getHello(): string {
		return 'Hello World!';
	}

	async publish() {
		await this.client
			.emit<number>(
				'user_created',
				{
					id: 1,
				},
			).toPromise();
	}
}
