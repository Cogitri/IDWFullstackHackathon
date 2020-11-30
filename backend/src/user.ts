import {
  Path,
  PathParam,
  QueryParam,
  GET,
  POST,
  PUT,
  Context,
  ServiceContext,
  Errors,
  Return,
  ContextRequest,
  Security,
} from "typescript-rest";
import { ProductAndAmount, ProductStock, StatusEnum } from "./product";
import { ApiServer, DbConnection } from "./server";
import * as Entities from "./entities";

interface User {
  id: number;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  longitude: number;
  latitude: number;
  isFarmer: boolean;
  products?: ProductAndAmount[];
  farmingMethodology?: string;
  covidGuidelines?: string;
}

interface Login {
  username: string;
  password: string;
}

@Path("/user")
export class UserService {
  @Context
  context: ServiceContext;

  @POST
  createUser(login: any): Promise<Return.NewResource<any>> {
    return new Promise<Return.NewResource<any>>((resolve, reject) => {
      let user = new Entities.Users();
      user.passwordHash = login.password;
      user.username = login.username;

      if (login.license != "") {
        user.licensed = true;
      } else {
        user.licensed = false;
      }

      user.email = " ";
      user.firstName = "";
      user.lastName = "";
      user.phone = "";
      user.longitude = 0;
      user.latitude = 0;

      DbConnection.getInstance()
        .manager.save(user)
        .then((user) => {
          resolve(
            new Return.NewResource<any>(
              this.context.request.url + "/" + user.id,
              ApiServer.generateJWTToken({
                username: login.username,
                id: user.id,
              })
            )
          );
        })
        .catch((e) => {
          reject(new Errors.BadRequestError("Failed to create user: " + e));
        });
    });
  }

  @GET
  getAllUsers(): Promise<Entities.Users[]> {
    return new Promise<Entities.Users[]>((resolve, reject) => {
      DbConnection.getInstance()
        .manager.find(Entities.Users)
        .then((users) => {
          resolve(users);
        })
        .catch((e) => {
          reject(new Errors.BadRequestError("Failed to list users: " + e));
        });
    });
  }

  @Path("/products/:username")
  @GET
  async getAllProductsOfUser() {
    let products = await DbConnection.getInstance().manager.find(
      Entities.Products
    );
    let arr: ProductStock[];
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let category = await DbConnection.getInstance().manager.findOne(
        Entities.Categories,
        product.category_id
      );
      arr.push({
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
      });
    }

    return arr;
  }

  @Path("/login")
  @POST
  async loginUser(login: Login): Promise<any> {
    let users = await DbConnection.getInstance().manager.find(Entities.Users);

    for (let u of users) {
      if (u.username == login.username) {
        if (u.passwordHash == login.password) {
          let user: User = {
            id: u.id,
            username: u.username,
            passwordHash: u.passwordHash,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            phone: u.phone,
            longitude: u.longitude,
            latitude: u.latitude,
            isFarmer: u.licensed,
          };
          return ApiServer.generateJWTToken(user);
        } else {
          throw new Errors.BadRequestError("Bad password");
        }
      }
    }

    throw new Errors.BadRequestError("No such user");
  }

  @Path("/logout")
  @GET
  logoutUser(@QueryParam("username") username: string): void {}

  @Path(":username")
  @GET
  getUserInfo(@PathParam("username") username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      DbConnection.getInstance()
        .manager.find(Entities.Users)
        .then((users) => {
          for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.username == username) {
              resolve({
                id: user.id,
                username: user.username,
                passwordHash: user.passwordHash,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                longitude: user.longitude,
                latitude: user.latitude,
                isFarmer: user.licensed,
                farmingMethodology: user.farmingMethodology,
                covidGuidelines: user.covidGuidelines,
              });
              return;
            }
          }
          reject(new Errors.BadRequestError("No such user"));
        })
        .catch((e) => {
          reject(new Errors.BadRequestError("Failed to search for user: " + e));
        });
    });
  }

  @PUT
  editUserInfo(editedUser: User): User {
    try {
      let user: User = {
        id: 0,
        username: editedUser.username,
        passwordHash: "abcd123",
        firstName: "admin",
        lastName: "admin",
        email: "admin@example.org",
        phone: "+490000",
        longitude: 0,
        latitude: 0,
        isFarmer: false,
      };
      return user;
    } catch (error) {
      throw new Errors.BadRequestError();
    }
  }
}
