import express, { Application } from "express";
import auth from "./routes/auth.route";
import products from "./routes/product.route";
import carts from "./routes/cart.route";
import orders from "./routes/order.route";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./swagger.json";

export const setupRoutes = (app: Application) => {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/products", products);
  app.use("/api/carts", carts);
  app.use("/api/orders", orders);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
