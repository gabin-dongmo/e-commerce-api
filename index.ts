import express from "express";
import { logger } from "./src/startup/logging";
import { setupRoutes } from "./src/server";
import { PORT } from "./src/startup/config";
import { connectToDB } from "./src/startup/database";

const app = express();
setupRoutes(app);
connectToDB();
export const server = app.listen(PORT, () => {
  logger.info(`[server]: listening on port ${PORT}`);
});
