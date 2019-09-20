import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as HttpProxy from 'http-proxy';
import * as fs from 'file-system';
import { MercuryClient } from '@solar-system/god/src/mercury';
import axios, { AxiosInstance } from 'axios';

const app = express();

class DB {
	private readonly data: { [key: string]: any };

	constructor() {
		try {
			const data = fs.readFileSync('./db.json').toString();
			this.data = JSON.parse(data);
		} catch (e) {
			this.data = {};
		}
	}

	get(key): string | undefined {
		return this.data[key];
	}

	set(key, value) {
		this.data[key] = value;
		fs.writeFile(
			'./db.json',
			JSON.stringify(this.data),
			{},
			(err) => {
				if (err) {
					console.log(err);
				}
			},
		);
		return value;
	}

	all() {
		const list = [];
		// tslint:disable-next-line:forin
		for (const k in this.data) {
			list.push({
				prefix: k,
				target: this.data[k],
			});
		}
		return list;
	}
}

console.log('Init db');
const db = new DB();
type target = string;

// tslint:disable-next-line:class-name
function needProxy(req): Promise<target> {
	return new Promise((resolve) => {
		let res = null;
		const p = req._parsedUrl.pathname.match(/^\/(\S*?)\//);
		// const p = req._parsedUrl.pathname.split('/');
		if (p && p.length > 0) {
			res = db.get(p[1]);
		}
		resolve(res);
	});
}

const hp = new HttpProxy({
	ws: true,
	changeOrigin: true,
});
const client: MercuryClient<AxiosInstance> = new MercuryClient(axios.create({ baseURL: 'http://127.0.0.1:3434' }));
// const client: MercuryClient<AxiosInstance> = new MercuryClient(axios);
const parser = session({
	resave: true,
	saveUninitialized: true,
	secret: 'sucsoft',
});
console.log('Use helmet');
app.use(helmet());
console.log('Use http-proxy');
app.use(async (request, response, next) => {
	const target = await needProxy(request);
	if (target) {
		hp.web(
			request, response,
			{ target },
			(err, req, res) => {
				response.status(500)
					.send({
						message: err.message,
						statusCode: 500,
						timestamp: new Date().valueOf(),
					});
			},
		);
	} else {
		next();
	}
});
console.log('Use body-parser');
app.use(express.urlencoded({ extended: false }));
console.log('Use compression');
app.use(compression());
console.log('Use express-session');
app.use(parser);
console.log('Use dir ./public for static');
app.use(express.static('public'));
app.get('/center/add', (req, res) => {
	const prefix = req.query.prefix;
	const target = req.query.target;
	console.log(req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]);
	if (prefix && target) {
		db.set(prefix, target);
		console.log(`/center/add ${prefix} => ${target}`);
	}
	res.json(req.query);
});
app.post('/login', (req, res) => {
	client
		.validate({
			username: req.body.username,
			password: req.body.password,
		})
		.then(({ data }) => {
			res.json(data);
		})
		.catch((e) => {
			res.status(500)
				.json({
					message: e.message,
				});
		});
});
console.log('Prepare Sun Center ...');
app.listen(3434, () => {
	console.log('Now Sun is start at 3434');
});
