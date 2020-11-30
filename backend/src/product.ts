import {
  Path,
  GET,
  PathParam,
  POST,
  DELETE,
  Return,
  ContextRequest,
  Security,
  ServiceContext,
  Context,
  Errors,
} from "typescript-rest";
import express from "express";
import { DbConnection } from "./server";
import * as Entities from "./entities";
import { BadRequestError } from "typescript-rest/dist/server/model/errors";

export interface Tag {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  category: Category;
  name: string;
  description: string;
  photoUrls: string[];
  expiryDate: string;
  manufacturingDate: string;
  paymentMethod: string;
  deliveryMethod: string;
  status: StatusEnum;
  price: number;
  tags: Tag[];
}

export interface ProductStock {
  product: Product;
  farmerId: number;
  amount: number;
}

export enum StatusEnum {
  Available = "available",
  OutOfStock = "outOfStock",
  Sold = "sold",
}

interface Category {
  id: number;
  name: string;
}

export interface ProductAndAmount {
  productId: number;
  quantity: number;
}

@Path("/product")
export class ProductService {
  @Context
  context: ServiceContext;

  @POST
  async addNewProduct(product: ProductStock) {
    let dbProduct = new Entities.Products();
    let dbOffering = new Entities.Offering();

    let category = await DbConnection.getInstance().manager.findOne(
      Entities.Categories,
      product.product.category.id
    );

    if (category === undefined) {
      let dbCategory = new Entities.Categories();

      dbCategory.category_name = product.product.category.name;

      let createdCategory = await DbConnection.getInstance().manager.save(
        dbCategory
      );
      dbProduct.category_id = createdCategory.id;
    } else {
      dbProduct.category_id = product.product.category.id;
    }

    dbOffering.farmer_id = product.farmerId;
    dbProduct.deliveryMethod = product.product.deliveryMethod;
    dbProduct.description = product.product.description;
    dbProduct.expiryDate = new Date(product.product.expiryDate);
    dbProduct.manufacturingDate = new Date(product.product.manufacturingDate);
    dbProduct.paymentMethod = product.product.paymentMethod;
    dbProduct.price = product.product.price;
    dbProduct.productname = product.product.name;
    dbProduct.status = product.product.status;
    dbProduct.stock = product.amount;

    await DbConnection.getInstance().manager.save(dbProduct);
    await DbConnection.getInstance().manager.save(dbOffering);
    return new Return.NewResource(
      this.context.request.url + "/" + dbProduct.id
    );
  }

  @Path(":productId")
  @GET
  async getProductInfo(@PathParam("productId") productId: number) {
    let product = await DbConnection.getInstance().manager.findOne(
      Entities.Products,
      productId
    );
    if (product === undefined) {
      throw new Errors.NotFoundError("No such product");
    }
    let category = await DbConnection.getInstance().manager.findOne(
      Entities.Categories,
      product.category_id
    );
    return {
      amount: product.stock,
      product: {
        id: product.id,
        expiryDate: product.expiryDate.toISOString(),
        category: {
          id: category.id,
          name: category.category_name,
        },
        name: product.productname,
        description: product.description,
        manufacturingDate: product.manufacturingDate.toISOString(),
        paymentMethod: product.paymentMethod,
        deliveryMethod: product.deliveryMethod,
        status:
          StatusEnum[
            product.status.charAt(0).toUpperCase() + product.status.slice(1)
          ],
        price: product.price,
        tags: [],
        photoUrls: [],
      },
    };
  }

  @Path(":productId")
  @DELETE
  async deleteProduct(@PathParam("productId") productId: number) {
    await DbConnection.getInstance().manager.delete(Entities.Products, {
      id: productId,
    });
  }
}
