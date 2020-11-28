import { Path, GET, PathParam, POST } from "typescript-rest";

interface Order {
  id: number;
  productId: number;
  quantity: number;
  orderDate: Date;
  status: string;
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
      productId: 0,
      quantity: 1,
      orderDate: new Date(),
      status: "placed",
    };
    return JSON.stringify(order);
  }
}
