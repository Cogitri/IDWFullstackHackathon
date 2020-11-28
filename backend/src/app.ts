const express = require("express");
import { Server } from "typescript-rest";
import { ProductService } from "./product";
import { StoreService } from "./store";
import { UserService } from "./user";

const app = express();
Server.buildServices(app, ProductService, StoreService, UserService);

app.listen(8000, function () {
  console.log("Rest Server listening on port 8000!");
});
