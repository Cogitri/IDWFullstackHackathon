import { assert } from "console";
import express from "express";
import request from "supertest";
import { Server, PassportAuthenticator } from "typescript-rest";
import { ProductService } from "../product";
<<<<<<< HEAD
import { DbConnection } from "../server";
import { createConnection } from "typeorm";
import * as Entities from "../entities";
=======
import { MockStrategy } from "passport-mock-strategy";
>>>>>>> 7f656f6 (backend: fix unittests)

const app = express();

const authenticator = new PassportAuthenticator(new MockStrategy());
Server.registerAuthenticator(authenticator);
Server.buildServices(app, ProductService);

<<<<<<< HEAD
describe("POST /product", () => {
  it("should return 201 & be OK", async (done) => {
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
      entities: [
        Entities.Categories,
        Entities.Products,
        Entities.Offering,
        Entities.Users,
      ],
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
      request(app)
        .post("/product")
        .send({
          product: {
            category: { name: "test2", id: 2 },
            deliveryMethod: "bike",
            description: "much wow",
            expiryDate: "2020-11-29",
            manufacturingDate: "2020-11-28",
            paymentMethod: "paypal",
            price: 15,
            name: "carrot",
            status: "available",
          },
          amount: 15,
          farmerId: 1,
        })
        .expect(201)
        .end(function (err, res) {
          if (err) {
            console.log(res.text);
            throw err;
          }
          done();
        });
    });
=======
describe("GET /product", () => {
  it("should return 200 & the correct product", async (done) => {
    request(app)
      .get("/product/25")
      //.expect("Content-Type", /json/)
      .expect(200)
      .expect(function (res) {
        console.log(res);
        res.body.id = 25;
      })
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});

describe("POST /product", () => {
  it("should return 201 & be OK", async (done) => {
    request(app)
      .post("/product")
      .send()
      .expect(201)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});

describe("DELETE /product", () => {
  it("should return 204 & be OK", async (done) => {
    request(app)
      .delete("/product/25")
      .expect(204)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
>>>>>>> 7f656f6 (backend: fix unittests)
  });
});
