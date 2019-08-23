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
			let data = fs.readFileSync('./db.json').toString();
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
		let list = [];
		for (let k in this.data) {
			list.push({
				prefix: k,
				target: this.data[k],
			});
		}
		return list;
	}
}

console.log('init db');
const db = new DB();
type target = string;

function needProxy(req): Promise<target> {
	return new Promise((resolve) => {
		let res, p = req._parsedUrl.pathname.split('/');
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
console.log('use helmet');
app.use(helmet());
console.log('use http-proxy');
app.use(async (request, response, next) => {
	let target = await needProxy(request);
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
console.log('use body-parser');
app.use(express.urlencoded({ extended: false }));
console.log('use compression');
app.use(compression());
console.log('use express-session');
app.use(parser);
console.log('use dir ./public for static');
app.use(express.static('public'));
app.get('/center/add', (req, res) => {
	let prefix = req.query.prefix;
	let target = req.query.target;
	if (prefix && target) {
		db.set(prefix, target);
		console.log(`/center/add ${prefix} => ${target}`);
	}
	res.json(req.query);
});
console.log('start server ...');
app.listen(3434, () => {
	console.log('now server is start at 3434');
});
