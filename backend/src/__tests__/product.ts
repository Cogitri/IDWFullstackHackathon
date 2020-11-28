import { assert } from "console";
import express from "express";
import request from "supertest";
import { Server } from "typescript-rest";
import { ProductService } from "../product";

const app = express();
Server.buildServices(app, ProductService);

describe("GET /product", () => {
  it("should return 200 & the correct product", async (done) => {
    request(app)
      .get("/product/25")
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

describe("POST /product", () => {
  it("should return 200 & be OK", async (done) => {
    request(app)
      .post("/product/25")
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

describe("DELETE /product", () => {
  it("should return 200 & be OK", async (done) => {
    request(app)
      .delete("/product/25")
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
