import { Path, GET, PathParam, POST } from "typescript-rest";
import { ProductAndAmount } from "./product";

interface Order {
  id: number;
  products: ProductAndAmount[];
  orderDate: Date;
  status: Status;
  customerId: number;
  farmerId: number;
  totalPrice: number;
}

enum Status {
  Placed = "placed",
  Approved = "approved",
  Completed = "completed",
}

@Path("/store")
export class StoreService {
  @Path("/order")
  @POST
  placeOrder(): string {
    return '{"status":"ok"}';
  }

  @Path("/order/:orderId")
  @GET
  getOrderInfo(@PathParam("orderId") orderId: number): string {
    let order: Order = {
      id: orderId,
      products: [{ productId: 5, quantity: 3 }],
      orderDate: new Date(),
      status: Status.Placed,
      customerId: 5,
      farmerId: 6,
      totalPrice: 30,
    };
    return JSON.stringify(order);
  }
}
