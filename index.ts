import express from "express";
import { setupRoutes } from "./src/server";
import { PORT } from "./src/startup/config";
import { connectToDB } from "./src/startup/database";

const app = express();
setupRoutes(app);
connectToDB();
export const server = app.listen(PORT, () => {
  console.log(`[server]: listening on port ${PORT}`);
});
