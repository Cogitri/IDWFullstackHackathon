import { ApiServer } from "./server";

const server = new ApiServer();

server.start().then(function () {
  console.log("Sucessfully started server");
});
