import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export interface HttpInstance {
	get(url: string, config?: AxiosRequestConfig);

	delete(url: string, config?: AxiosRequestConfig);

	head(url: string, config?: AxiosRequestConfig);

	post(url: string, data?: any, config?: AxiosRequestConfig);

	put(url: string, data?: any, config?: AxiosRequestConfig);

	patch(url: string, data?: any, config?: AxiosRequestConfig);
}

export type PromiseRes<T> = Promise<AxiosResponse<T>>;
export type RxRes<T> = Observable<AxiosResponse<T>>;
