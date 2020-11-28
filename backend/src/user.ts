import { Path, PathParam, QueryParam, GET, POST, PUT } from "typescript-rest";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userStatus: string;
}

interface Login {
  username: string;
  password: string;
}

@Path("/user")
export class UserService {
  @POST
  createUser(createdUser: User) {
    // create new user entry in database with provided credentials
    // Surround with try-catch (return '{"status":"err"}' on error)

    // Placeholder until database is set up
    return '{"status":"ok"}';
  }

  @Path("/login")
  @POST
  loginUser(login: Login): string {
    // Check if the following parameters match the database entries
    // login.username && login.password
    // true -> return '{"status":"ok"}';
    // false -> return '{"status":"err"}';

    // Placeholder until database is set up
    return '{"status":"ok"}';
  }

  @Path("/logout")
  @GET
  logoutUser(@QueryParam("username") username: string): string {
    return '{"status":"ok"}';
  }

  @Path(":username")
  @GET
  getUserInfo(@PathParam("username") username: string): string {
    // Placeholder until database is set up
    let user: User = {
      id: 0,
      username,
      firstName: "admin",
      lastName: "admin",
      email: "admin@example.org",
      phone: "+490000",
      userStatus: "admin",
    };
    return JSON.stringify(user);
  }

  @Path(":username")
  @PUT
  editUserInfo(newUser: User): string {
    // Change user information in database accordingly to body content
    // Surround with try-catch (return '{"status":"err"}' on error)
    return '{"status":"ok"}';
  }
}
