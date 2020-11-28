import { Path, GET, PathParam, POST, DELETE } from "typescript-rest";

interface Product {
  id: number;
  category: Category;
  name: string;
  description: string;
  photoUrls: [string];
  expiryDate: string;
  manufacturingDate: string;
  paymentMethod: string;
  deliveryMethod: string;
  status: Status;
  stock: number;
  price: number;
}

enum Status {
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
  addNewProduct(): string {
    return '{"status":"ok"}';
  }

  @Path(":productId")
  @GET
  getProductInfo(@PathParam("productId") productId: string): string {
    let product: Product = {
      id: 0,
      name: "example",
      description: "test",
      category: { id: 5, name: "test" },
      photoUrls: [""],
      status: Status.Available,
      expiryDate: "2020-11-28",
      manufacturingDate: "2020-11-28",
      paymentMethod: "cash",
      deliveryMethod: "pick-up",
      price: 0,
      stock: 10,
    };
    return JSON.stringify(product);
  }

  @Path(":productId")
  @POST
  updateProductInfo(@PathParam("productId") productId: string): string {
    return '{"status":"ok"}';
  }

  @Path(":productId")
  @DELETE
  deleteProduct(@PathParam("productId") productId: string): string {
    return '{"status":"ok"}';
  }
}
