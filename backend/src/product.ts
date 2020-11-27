import { Path, GET, PathParam, POST, PUT, DELETE } from "typescript-rest";

interface Product {
    id: number;
    name: string;
    photoUrls: [string];
    tags: [string];
    status: string;
    price: number;
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
            photoUrls: [""],
            tags: [""],
            status: "available",
            price: 0,
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
