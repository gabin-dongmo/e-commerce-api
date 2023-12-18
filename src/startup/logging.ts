import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ssZ",
    }),
    prettyPrint(),
    format.metadata(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

logger.exceptions.handle(
  new transports.File({ filename: "uncaughtException.log" }),
);

process.on("unhandledRejection", (e) => {
  // logger.error(e.message, e);
  // process.exit(1);
  throw e;
});

export { logger };
