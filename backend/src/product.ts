import {
  Path,
  GET,
  PathParam,
  POST,
  DELETE,
  Return,
  ContextRequest,
  Security,
} from "typescript-rest";
import express from "express";

interface Product {
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
  stock: number;
  price: number;
}

enum StatusEnum {
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
  @POST
  @Security()
  addNewProduct(
    product: Product,
    @ContextRequest request: express.Request
  ): Return.NewResource<void> {
    return new Return.NewResource<void>(request.url + "/" + product.id);
  }

  @Path(":productId")
  @GET
  @Security()
  getProductInfo(@PathParam("productId") productId: number): Product {
    let product: Product = {
      id: 0,
      name: "example",
      description: "test",
      category: { id: 5, name: "test" },
      photoUrls: [""],
      status: StatusEnum.Available,
      expiryDate: "2020-11-28",
      manufacturingDate: "2020-11-28",
      paymentMethod: "cash",
      deliveryMethod: "pick-up",
      price: 0,
      stock: 10,
    };
    return product;
  }

  @Path(":productId")
  @DELETE
  @Security()
  deleteProduct(@PathParam("productId") productId: number): void {}
}
