import { Path, GET, PathParam, POST, PUT, DELETE } from "typescript-rest";

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userStatus: string;
}

@Path("/user")
export class UserService {
  @POST
  createUser() {
    // create User and return its info
    let createdUser: User = {
      id: 0,
      username: "admin",
      firstName: "admin",
      lastName: "admin",
      email: "admin@example.org",
      phone: "+490000",
      userStatus: "admin",
    };
    return JSON.stringify(createdUser);
  }

  @Path("/login")
  @GET
  loginUser(
    @PathParam("login") username: string,
    @PathParam("password") password: string
  ): string {
    return '{"status":"ok"}';
  }

  @Path("/logout")
  @GET
  logoutUser(): string {
    return '{"status":"ok"}';
  }

  @Path(":username")
  @GET
  getUserInfo(@PathParam("username") username: string): string {
    let user: User = {
      id: 0,
      username: "admin",
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
  editUserInfo(@PathParam("username") username: string): string {
    return '{"status":"ok"}';
  }

  @Path(":username")
  @DELETE
  deleteUser(@PathParam("username") username: string): string {
    return '{"status":"ok"}';
  }
}
