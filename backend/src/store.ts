import {
  Path,
  GET,
  PathParam,
  POST,
  Context,
  ServiceContext,
  Return,
  ContextRequest,
  Security,
  Errors,
} from "typescript-rest";
import { ProductAndAmount } from "./product";
import express from "express";
import { resolve } from "path";
import { DbConnection } from "./server";
import * as Entities from "./entities";

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
  @Security()
  placeOrder(
    newOrder: Order,
    @ContextRequest request: express.Request
  ): Promise<Return.NewResource<void>> {
    return new Promise<Return.NewResource<void>>((resolve, reject) => {
      let order = new Entities.Orders();

      order.id = newOrder.id;
      order.customer_id = newOrder.customerId;
      order.farmer_id = newOrder.farmerId;
      order.order_date = newOrder.orderDate;
      order.status = newOrder.status;
      order.total_price = newOrder.totalPrice;

      newOrder.products.forEach((product) => {
        let orderedProduct = new Entities.OrderedProducts();
        orderedProduct.order_id = newOrder.id;
        orderedProduct.quantity = product.quantity;
        orderedProduct.product_id = product.productId;
      });

      DbConnection.getInstance()
        .manager.save(order)
        .then((order) => {
          resolve(
            new Return.NewResource<void>(
              this.context.request.url + "/" + order.id
            )
          );
        })
        .catch((e) => reject(new Errors.BadRequestError("Invalid order" + e)));
    });
  }

  @Path("/order/:orderId")
  @GET
  @Security()
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
