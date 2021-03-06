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
  async placeOrder(newOrder: Order): Promise<Return.NewResource<void>> {
    let order = new Entities.Orders();

    order.customer_id = newOrder.customerId;
    order.farmer_id = newOrder.farmerId;
    order.order_date = newOrder.orderDate;
    order.status = newOrder.status;
    order.total_price = newOrder.totalPrice;
    await DbConnection.getInstance().manager.save(order);

    for (const product of newOrder.products) {
      let orderedProduct = new Entities.OrderedProducts();
      orderedProduct.order_id = order.id;
      orderedProduct.quantity = product.quantity;
      orderedProduct.product_id = product.productId;
      await DbConnection.getInstance().manager.save(orderedProduct);
    }

    return new Return.NewResource<void>(
      this.context.request.url + "/" + order.id
    );
  }

  @Path("/order/:orderId")
  @GET
  async getOrderInfo(@PathParam("orderId") orderId: number) {
    let dbOrder = await DbConnection.getInstance().manager.findOne(
      Entities.Orders,
      orderId
    );

    let infos = await DbConnection.getInstance().manager.find(
      Entities.OrderedProducts
    );
    let productArray: ProductAndAmount[] = [];

    for (let i = 0; i < infos.length; i++) {
      let info = infos[i];

      if (info.order_id == orderId) {
        productArray.push({
          quantity: info.quantity,
          productId: info.product_id,
        });
      }
    }

    let order: Order = {
      id: dbOrder.id,
      orderDate: dbOrder.order_date,
      customerId: dbOrder.customer_id,
      farmerId: dbOrder.farmer_id,
      status:
        StatusEnum[
          dbOrder.status.charAt(0).toUpperCase + dbOrder.status.slice(1)
        ],
      totalPrice: dbOrder.total_price,
      products: productArray,
    };
    return order;
  }
}
