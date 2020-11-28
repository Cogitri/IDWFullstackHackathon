import { assert } from "console";
import express from "express";
import request from "supertest";
import { Server } from "typescript-rest";
import { StoreService } from "../store";

const app = express();
Server.buildServices(app, StoreService);

describe("GET /store", () => {
  it("should return 200 & return order info", async (done) => {
    request(app)
      .get("/store/order/25")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(function (res) {
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

describe("POST /store", () => {
  it("should return 200 & place order", async (done) => {
    request(app)
      .post("/store/order")
      .send(
        '{ "id": 25, "products": [{ "productId": 5, "quantity": 3 }], "orderDate": "", "status": "placed", "customerId": 5, "farmerId": 6, "totalPrice": 30}'
      )
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(function (res) {
        res.body.status = "ok";
      })
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
