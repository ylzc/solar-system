import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpInstance {
	get(url: string, config?: AxiosRequestConfig): any;

	delete(url: string, config?: AxiosRequestConfig): any;

	head(url: string, config?: AxiosRequestConfig): any;

	post(url: string, data?: any, config?: AxiosRequestConfig): any;

	put(url: string, data?: any, config?: AxiosRequestConfig): any;

	patch(url: string, data?: any, config?: AxiosRequestConfig): any;
}
