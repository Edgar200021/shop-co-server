import express, { Request } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import "express-async-errors";

import { AppError } from "./utils/AppError";
import env from "./utils/validateEnv";
import errorController from "./controllers/errorController";

import productRouter from "./routes/productRoutes";

const app = express();

app.use([
  helmet(),
  express.json(),
  cors(),
  mongoSanitize(),
  hpp({ whitelist: [] }),
]);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/products", productRouter);

app.all("*", (req: Request /* res: Response, next: NextFunction*/) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
});
app.use(errorController);

export default app;
