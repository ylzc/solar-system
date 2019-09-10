import { Injectable, OnModuleInit } from '@nestjs/common';
import { newEnforcer, Enforcer } from 'casbin';
import { resolve } from 'path';
import TypeORMAdapter from 'typeorm-adapter';

@Injectable()
export class AppService implements OnModuleInit {

	private enforcer: Enforcer;

	private adapter: TypeORMAdapter;

	async onModuleInit(): Promise<any> {
		this.adapter = await TypeORMAdapter.newAdapter({
			type: 'postgres',
			host: '172.18.0.127',
			database: 'solar-system',
			username: 'postgres',
			schema: 'moon-auth',
		});
		this.enforcer = await newEnforcer(resolve(__dirname, '../share/model.conf'), this.adapter);
		await this.enforcer.loadPolicy();
		await this.enforcer.addPolicy('alice', null, 'data', 'read');
	}

	enforce(sub: string, domain: string, obj: any, act: string) {
		return this.enforcer.enforce(sub, domain, obj, act);
	}

}
