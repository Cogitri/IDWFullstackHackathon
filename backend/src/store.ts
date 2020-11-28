import {
  Path,
  GET,
  PathParam,
  POST,
  Context,
  ServiceContext,
} from "typescript-rest";
import { ProductAndAmount } from "./product";
import { Status, StatusErr, StatusOK } from "./common";

interface Order {
  id: number;
  products: ProductAndAmount[];
  orderDate: Date;
  status: StatusEnum;
  customerId: number;
  farmerId: number;
  totalPrice: number;
}

enum StatusEnum {
  Placed = "placed",
  Approved = "approved",
  Completed = "completed",
}

@Path("/store")
export class StoreService {
  @Context
  context: ServiceContext;

  @Path("/order")
  @POST
  placeOrder(order: Order): Status {
    return StatusOK;
  }

  @Path("/order/:orderId")
  @GET
  getOrderInfo(@PathParam("orderId") orderId: number): Order {
    let order: Order = {
      id: orderId,
      products: [{ productId: 5, quantity: 3 }],
      orderDate: new Date(),
      status: StatusEnum.Placed,
      customerId: 5,
      farmerId: 6,
      totalPrice: 30,
    };
    return order;
  }
}
