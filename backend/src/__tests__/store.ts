import { assert } from "console";
import express from "express";
import request from "supertest";
import { Server } from "typescript-rest";
import { ProductService } from "../product";
import { DbConnection } from "../server";
import { createConnection } from "typeorm";
import * as Entities from "../entities";

const app = express();
Server.buildServices(app, ProductService);

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
  });
});
