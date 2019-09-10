import * as express from 'express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as HttpProxy from 'http-proxy';
import * as fs from 'file-system';

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

function needProxy(req): Promise<target> {
	return new Promise((resolve) => {
		let res = null;
		const p = req._parsedUrl.pathname.split('/');
		if (p.length) {
			res = db.get(p[1]);
		}
		resolve(res);
	});
}

const hp = new HttpProxy({
	ws: true,
	changeOrigin: true,
});
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
	if (prefix && target) {
		db.set(prefix, target);
		console.log(`/center/add ${prefix} => ${target}`);
	}
	res.json(req.query);
});
app.post('/login', (req, res) => {

});
console.log('Prepare Sun Center ...');
app.listen(3434, () => {
	console.log('Now Sun is start at 3434');
});
