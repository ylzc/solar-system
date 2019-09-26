import { Injectable, OnModuleInit } from '@nestjs/common';
import { newEnforcer, Enforcer } from 'casbin';
import { resolve } from 'path';
import TypeORMAdapter from 'typeorm-adapter';

// tslint:disable-next-line:class-name
type role = string;
// tslint:disable-next-line:class-name
type user = string;

@Injectable()
export class AuthService implements OnModuleInit {

	private enforcer: Enforcer;

	private adapter: TypeORMAdapter;

	async onModuleInit(): Promise<void> {
		this.adapter = await TypeORMAdapter.newAdapter({
			type: 'postgres',
			host: process.env.DB_HOST || '127.0.0.1',
			port: Number(process.env.DB_PORT) || 5432,
			database: 'postgres',
			username: 'postgres',
			schema: 'public',
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
