import {
  Path,
  PathParam,
  QueryParam,
  GET,
  POST,
  PUT,
  Context,
  ServiceContext,
  Errors,
  Return,
  ContextRequest,
  Security,
} from "typescript-rest";
import { ProductAndAmount } from "./product";
import express from "express";
import { ApiServer } from "./server";

interface User {
  id: number;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  longitude: number;
  latitude: number;
  isFarmer: boolean;
  products?: ProductAndAmount[];
  farmingMethodology?: string;
  covidGuidelines?: string;
}

interface Login {
  username: string;
  password: string;
}

@Path("/user")
export class UserService {
  @Context
  context: ServiceContext;

  @POST
  createUser(
    createdUser: User,
    @ContextRequest request: express.Request
  ): Promise<Return.NewResource<User>> {
    return new Promise<Return.NewResource<User>>(function (resolve, reject) {
      // create new user

      // data is valid
      if (true) {
        resolve(
          new Return.NewResource<User>(
            request.url + "/" + createdUser.id,
            createdUser
          )
        );
      } else {
        reject(new Errors.BadRequestError("bad username or password"));
      }
    });
  }

  @Path("/login")
  @POST
  async loginUser(login: Login): Promise<any> {
    return new Promise<any>(function (resolve, reject) {
      if (login.username == login.password) {
        let user: User = {
          id: 0,
          username: login.username,
          passwordHash: "abcd123",
          firstName: "admin",
          lastName: "admin",
          email: "admin@example.org",
          phone: "+490000",
          longitude: 0,
          latitude: 0,
          isFarmer: false,
        };
        resolve(ApiServer.generateJWTToken(user));
      } else {
        reject(new Errors.BadRequestError("bad username or password"));
      }
    });
  }

  @Path("/logout")
  @GET
  @Security()
  logoutUser(@QueryParam("username") username: string): void {}

  @Path(":username")
  @GET
  @Security()
  getUserInfo(@PathParam("username") username: string): User {
    // Placeholder until database is set up
    try {
      let user: User = {
        id: 0,
        username: username,
        passwordHash: "abcd123",
        firstName: "admin",
        lastName: "admin",
        email: "admin@example.org",
        phone: "+490000",
        longitude: 0,
        latitude: 0,
        isFarmer: false,
      };
      return user;
    } catch (error) {
      throw new Errors.BadRequestError();
    }
  }

  @PUT
  @Security()
  editUserInfo(editedUser: User): User {
    try {
      let user: User = {
        id: 0,
        username: editedUser.username,
        passwordHash: "abcd123",
        firstName: "admin",
        lastName: "admin",
        email: "admin@example.org",
        phone: "+490000",
        longitude: 0,
        latitude: 0,
        isFarmer: false,
      };
      return user;
    } catch (error) {
      throw new Errors.BadRequestError();
    }
  }
}
