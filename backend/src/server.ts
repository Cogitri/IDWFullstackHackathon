import express from "express";
import mariadb from "mariadb";
import { PassportAuthenticator, Server } from "typescript-rest";
import { ProductService } from "./product";
import { StoreService } from "./store";
import { UserService } from "./user";
import { StrategyOptions, ExtractJwt, Strategy } from "passport-jwt";
import * as http from "http";

export class ApiServer {
  public PORT: number = 8000;
  private JWT_SECRET: string =
    "kohjee5ahcoo6shuSuuthohkiejeSh1voKohchahgh1iequ7eenu2ahba3Geingo";
  private readonly app: express.Application;
  private server: http.Server = null;

  constructor() {
    this.app = express();
    Server.buildServices(this.app, ProductService, StoreService, UserService);
  }

  public async start() {
    //await this.connectDB();
    this.configureJWT();
    return new Promise<void>((resolve, reject) => {
      this.server = this.app.listen(this.PORT, function () {
        console.log("Listening to http://127.0.0.1:8000");

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
      host: "localhost",
      user: "root",
      password: "myPassword",
      connectionLimit: 5,
    });
  }

  private configureJWT() {
    const jwtConfig: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(this.JWT_SECRET, "base64"),
    };

    const strategy = new Strategy(
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
}
