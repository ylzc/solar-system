import * as ips from 'ips';

export function getIp(host?: string) {
	const temp = ips();
	return (temp.docker || temp.local) || (host || '127.0.0.1');
}
