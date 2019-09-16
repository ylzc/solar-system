import { HttpInstance } from './http.instance';

export interface ClientInterface<T extends HttpInstance> {
	new(http: T);
}
