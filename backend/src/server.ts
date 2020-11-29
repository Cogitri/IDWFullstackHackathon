import express from 'express';
import mariadb from 'mariadb';
import { PassportAuthenticator, Server, Errors } from 'typescript-rest';
import { ProductService } from './product';
import { StoreService } from './store';
import { UserService } from './user';
import * as passport_jwt from 'passport-jwt';
import * as http from 'http';
var cors = require('cors');
import { sign } from 'jsonwebtoken';

const JWT_SECRET: string =
	'kohjee5ahcoo6shuSuuthohkiejeSh1voKohchahgh1iequ7eenu2ahba3Geingo';

export class ApiServer {
	public PORT: number = 8000;
	private readonly app: express.Application;
	private server: http.Server = null;

	constructor() {
		this.app = express();
		this.configureJWT();
		this.app.use(cors());
		Server.buildServices(this.app, ProductService, StoreService, UserService);

		this.configureErrors();
	}

	private configureErrors() {
		this.app.use(
			(
				err: any,
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				if (err instanceof Errors.BadRequestError) {
					if (res.headersSent) {
						// important to allow default error handler to close connection if headers already sent
						return next(err);
					}
					res.set('Content-Type', 'application/json');
					res.status(err.statusCode);
					res.json({ error: err.message, code: err.statusCode });
				} else {
					next(err);
				}
			}
		);
	}

	public async start() {
		//await this.connectDB();
		return new Promise<void>((resolve, reject) => {
			this.server = this.app.listen(this.PORT, function () {
				console.log('Listening to http://127.0.0.1:8000');

				return resolve();
			});
		});
	}

	public async stop(): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			if (this.server) {
				this.server.close(() => {
					return resolve(true);
				});
			} else {
				return resolve(true);
			}
		});
	}

	private async connectDB() {
		const pool = mariadb.createPool({
			host: 'localhost',
			user: 'root',
			password: 'myPassword',
			connectionLimit: 5,
		});
	}

	private configureJWT() {
		const jwtConfig: passport_jwt.StrategyOptions = {
			jwtFromRequest: passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: Buffer.from(JWT_SECRET, 'base64'),
		};

		const strategy = new passport_jwt.Strategy(
			jwtConfig,
			(payload: any, done: (err: any, user: any) => void) => {
				done(null, payload);
			}
		);
		const authenticator = new PassportAuthenticator(strategy, {
			deserializeUser: (user: string) => JSON.parse(user),
			serializeUser: (user: any) => {
				return JSON.stringify(user);
			},
		});
		Server.registerAuthenticator(authenticator);
	}

	public static generateJWTToken(obj: any): string {
		return sign(obj, JWT_SECRET);
	}
}
