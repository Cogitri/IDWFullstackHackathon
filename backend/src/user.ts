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
import express from "express";
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
  createUser(createdUser: User): Promise<Return.NewResource<User>> {
    return new Promise<Return.NewResource<User>>((resolve, reject) => {
      let user = new Entities.Users();
      user.username = createdUser.username;
      user.passwordHash = createdUser.passwordHash;
      user.firstName = createdUser.firstName;
      user.lastName = createdUser.lastName;
      user.email = createdUser.email;
      user.phone = createdUser.phone;
      user.longitude = createdUser.longitude;
      user.latitude = createdUser.latitude;
      user.licensed = createdUser.isFarmer;

      if (createdUser.isFarmer) {
        user.farmingMethodology = createdUser.farmingMethodology;
        user.covidGuidelines = createdUser.covidGuidelines;
      }

      DbConnection.getInstance()
        .manager.save(user)
        .then((user) => {
          resolve(
            new Return.NewResource<User>(
              this.context.request.url + "/" + user.id,
              createdUser
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
    return new Promise<any>(function (resolve, reject) {
      if (login.username == login.password) {
        let user: User = {
          id: 0,
          username: login.username,
          passwordHash: "abcd123",
          firstName: "admin",
          lastName: "admin",
          email: "admin@example.org",
          phone: "+490000",
          longitude: 0,
          latitude: 0,
          isFarmer: false,
        };
        resolve(ApiServer.generateJWTToken(user));
      } else {
        reject(new Errors.BadRequestError("bad username or password"));
      }
    });
  }

  @Path("/logout")
  @GET
  @Security()
  logoutUser(@QueryParam("username") username: string): void {}

  @Path(":username")
  @GET
  @Security()
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
  @Security()
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
