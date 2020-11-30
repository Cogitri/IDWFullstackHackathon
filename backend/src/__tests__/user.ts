import { assert } from "console";
import express from "express";
import request from "supertest";
import { Server } from "typescript-rest";
import { UserService } from "../user";
import { DbConnection } from "../server";
import { createConnection } from "typeorm";
import * as Entities from "../entities";

const app = express();
Server.buildServices(app, UserService);

describe("POST /user", () => {
  it("should return 201 & create user", async (done) => {
    createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "golocal",
      password: "Ii5mie8kiequ9XahcohRai5eihioBooy",
      database: "golocal",
      synchronize: true,
      dropSchema: true,
      logging: false,
      entities: [Entities.Categories, Entities.Products, Entities.Users],
    }).then((c) => {
      DbConnection.setInstance(c);
      request(app)
        .post("/user")
        .send({
          username: "admin",
          password: "abcd123",
          license: "",
        })
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });
});
