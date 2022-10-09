"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../controllers/userControllers/CreateUserController");
const DeleteUserController_1 = require("../controllers/userControllers/DeleteUserController");
const EditUserController_1 = require("../controllers/userControllers/EditUserController");
const GetAllUsersController_1 = require("../controllers/userControllers/GetAllUsersController");
const GetSingleUserController_1 = require("../controllers/userControllers/GetSingleUserController");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.get("/", new GetAllUsersController_1.GetAllUsersController().handle);
userRoutes.post("/", new CreateUserController_1.CreateUserController().handle);
userRoutes.put("/:id", new EditUserController_1.EditUserController().handle);
userRoutes.delete("/:id", new DeleteUserController_1.DeleteUserController().handle);
userRoutes.get("/:id", new GetSingleUserController_1.GetSingleUserController().handle);
//# sourceMappingURL=user.routes.js.map