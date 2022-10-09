"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const express_1 = require("express");
const CreateEventController_1 = require("../controllers/eventControllers/CreateEventController");
const DeleteEventController_1 = require("../controllers/eventControllers/DeleteEventController");
const EditEventController_1 = require("../controllers/eventControllers/EditEventController");
const GetAllEventsController_1 = require("../controllers/eventControllers/GetAllEventsController");
const eventRoutes = (0, express_1.Router)();
exports.eventRoutes = eventRoutes;
eventRoutes.get("/", new GetAllEventsController_1.GetAllEventsController().handle);
eventRoutes.post("/", new CreateEventController_1.CreateEventController().handle);
eventRoutes.put("/:id", new EditEventController_1.EditEventController().handle);
eventRoutes.delete("/:id", new DeleteEventController_1.DeleteEventController().handle);
//# sourceMappingURL=event.routes.js.map