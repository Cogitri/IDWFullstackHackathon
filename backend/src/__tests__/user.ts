import { assert } from "console";
import express from "express";
import request from "supertest";
import { Server } from "typescript-rest";
import { UserService } from "../user";

const app = express();
Server.buildServices(app, UserService);

describe("GET /user", () => {
  it("should return 200 & the correct user", async (done) => {
    request(app)
      .get("/user/admin")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(function (res) {
        res.body.username = "admin";
      })
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("should return 204 & log the user out", async (done) => {
    request(app)
      .get("/user/logout")
      .expect(204)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});

describe("POST /user", () => {
  it("should return 201 & create user", async (done) => {
    request(app)
      .post("/user")
      .send(
        '{"id": 0, "username": "admin", "passwordHash": "abcd123", "firstName": "admin", "lastName": "admin", "email": "admin@example.org","phone": "+490000", "longitude": 0, "latitude": 0, "isFarmer": false}'
      )
      .expect(201)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("should return 200 & login user", async (done) => {
    request(app)
      .post("/user/login")
      .send('{"username": "admin", "password": "admin12345"}')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});

describe("PUT /user", () => {
  it("should return 200 & update user", async (done) => {
    request(app)
      .put("/user")
      .send(
        '{"id": 0, "username": "admin", "passwordHash": "abcd123", "firstName": "admin", "lastName": "admin", "email": "admin@example.org","phone": "+490000", "longitude": 0, "latitude": 0, "isFarmer": false}'
      )
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});
