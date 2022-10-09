import "express-async-errors";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { routes } from "./routes";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
const swaggerDocument = require("../swagger.json");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);
app.use(ErrorHandlerMiddleware);

export default app;
