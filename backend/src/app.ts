const express = require("express");
import { Server, Path, GET, PathParam } from "typescript-rest";

@Path("/user")
class UserService {
  @Path(":username")
  @GET
  getUserInfo(@PathParam("username") username: string): string {
    return "Hello " + username;
  }
}

@Path("/product")
class ProductService {
  @Path(":productId")
  @GET
  getProductInfo(@PathParam("productId") productId: string): string {
    return "Info for product ID: " + productId;
  }
}

@Path("/store")
class StoreService {
  @Path("/order/:orderId")
  @GET
  getStoreInfo(@PathParam("orderId") orderId: string): string {
    return "Info for order ID: " + orderId;
  }
}

const app = express();
Server.buildServices(app);

app.listen(8000, function () {
  console.log('Rest Server listening on port 8000!');
});
