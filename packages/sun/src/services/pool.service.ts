import { Injectable } from '@nestjs/common';
import * as WrrPool from 'wrr-pool';

@Injectable()
export class PoolService {

	private readonly pools: Map<string, WrrPool<string>>;

	constructor() {
		this.pools = new Map();
	}

	setPool(id: string, config: any[]) {
		let pool = this.pools.get(id);
		if (!pool) {
			pool = new WrrPool();
			this.pools.set(id, pool);
		}
		config.forEach(item => {
			pool.add(item.target, item.weight || 100);
		});
		return pool;
	}

	reSetPool(id: string, config: any[]) {
		const pool = new WrrPool<string>();
		this.pools.set(id, pool);
		config.forEach(item => {
			pool.add(item.target, item.weight || 100);
		});
		return pool;
	}

	getPool(id: string) {
		return this.pools.get(id);
	}

	next(id) {
		const pool = this.pools.get(id);
		if (pool) {
			return pool.next();
		} else {
			return null;
		}
	}

}
