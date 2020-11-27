const express = require('express');
import { Server, Path, GET, PathParam } from "typescript-rest";

@Path("/hello")
class HelloService {
  @Path(":name")
  @GET
  sayHello(@PathParam('name') name: string): string {
    return "Hello " + name;
  }
}

const app = express();
Server.buildServices(app);

app.listen(8000, function () {
  console.log('Rest Server listening on port 8000!');
});
