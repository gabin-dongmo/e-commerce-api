import { logger } from "../startup/logging";

export function error(err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Something failed");
}
