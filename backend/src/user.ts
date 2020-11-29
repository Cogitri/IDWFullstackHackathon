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
} from "typescript-rest";
import { ProductAndAmount } from "./product";
import express from "express";

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
  ): Return.NewResource<void> {
    return new Return.NewResource<void>(request.url + "/" + createdUser.id);
  }

  @Path("/login")
  @POST
  loginUser(login: Login): User {
    // Check if the following parameters match the database entries
    // login.username && login.password
    // true -> return '{"status":"ok"}';
    // false -> return '{"status":"err"}';
    // Placeholder until database is set up
    let user: User = {
      id: 0,
      username: "admin",
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
  }

  @Path("/logout")
  @GET
  logoutUser(@QueryParam("username") username: string): void {}

  @Path(":username")
  @GET
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
