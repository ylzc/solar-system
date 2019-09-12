import { Injectable, OnModuleInit } from '@nestjs/common';
import { newEnforcer, Enforcer } from 'casbin';
import { resolve } from 'path';
import TypeORMAdapter from 'typeorm-adapter';

type role = string;
type user = string;

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
	}

	async enforce(sub: role | user, domain: string | null, obj: any, act: string) {
		return await this.enforcer.enforce(sub, domain, obj, act);
	}

	async addPolicy(sub: role | user, domain: string | null, obj: any, act: string) {
		return await this.enforcer.addPolicy(sub, domain, obj, act);
	}

	async addGroupingPolicy(user: string, role: string, domain: string | null) {
		return await this.enforcer.addGroupingPolicy(user, role, domain);
	}

}
