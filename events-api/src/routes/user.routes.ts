import { Router } from "express";
import { CreateUserController } from "../controllers/userControllers/CreateUserController";
import { DeleteUserController } from "../controllers/userControllers/DeleteUserController";
import { EditUserController } from "../controllers/userControllers/EditUserController";
import { GetAllUsersController } from "../controllers/userControllers/GetAllUsersController";
import { GetSingleUserController } from "../controllers/userControllers/GetSingleUserController";

const userRoutes = Router();

userRoutes.get("/", new GetAllUsersController().handle);
userRoutes.post("/", new CreateUserController().handle);
userRoutes.put("/:id", new EditUserController().handle);
userRoutes.delete("/:id", new DeleteUserController().handle);
userRoutes.get("/:id", new GetSingleUserController().handle);

export { userRoutes };
