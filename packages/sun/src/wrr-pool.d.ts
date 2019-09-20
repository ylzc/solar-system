declare module 'wrr-pool' {
	class WrrPool<T extends any> {

		next(): T;

		add(t: T, w: number): any;

		remove(func: (t: T) => boolean): any;

		get(func: (t: T) => boolean): { value: T, weight: number };

		update(func: (t: T) => boolean, n: T, w: number): any;

	}

	namespace WrrPool {

	}

	export = WrrPool;
}
