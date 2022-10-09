import { Router } from "express";
import { eventRoutes } from "./event.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/events", eventRoutes);

export { routes };
