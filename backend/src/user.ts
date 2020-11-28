import {
  Path,
  PathParam,
  QueryParam,
  GET,
  POST,
  PUT,
  Context,
  ServiceContext,
} from "typescript-rest";
import { ProductAndAmount } from "./product";
import { Status, StatusErr, StatusOK } from "./common";

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
  createUser(createdUser: User): Status {
    // create new user entry in database with provided credentials
    // Surround with try-catch (return '{"status":"err"}' on error)

    // Placeholder until database is set up
    return StatusOK;
  }

  @Path("/login")
  @POST
  loginUser(login: Login): Status {
    // Check if the following parameters match the database entries
    // login.username && login.password
    // true -> return '{"status":"ok"}';
    // false -> return '{"status":"err"}';

    // Placeholder until database is set up
    return StatusOK;
  }

  @Path("/logout")
  @GET
  logoutUser(@QueryParam("username") username: string): Status {
    return StatusOK;
  }

  @Path(":username")
  @GET
  getUserInfo(@PathParam("username") username: string): Status {
    // Placeholder until database is set up
    let user: User = {
      id: 0,
      username,
      passwordHash: "abcd123",
      firstName: "admin",
      lastName: "admin",
      email: "admin@example.org",
      phone: "+490000",
      longitude: 0,
      latitude: 0,
      isFarmer: false,
    };
    return StatusOK;
  }

  @Path(":username")
  @PUT
  editUserInfo(newUser: User): Status {
    // Change user information in database accordingly to body content
    // Surround with try-catch (return '{"status":"err"}' on error)
    return StatusOK;
  }
}
