import { Router } from "express";
import { CreateEventController } from "../controllers/eventControllers/CreateEventController";
import { DeleteEventController } from "../controllers/eventControllers/DeleteEventController";
import { EditEventController } from "../controllers/eventControllers/EditEventController";
import { GetAllEventsController } from "../controllers/eventControllers/GetAllEventsController";

const eventRoutes = Router();

eventRoutes.get("/", new GetAllEventsController().handle);
eventRoutes.post("/", new CreateEventController().handle);
eventRoutes.put("/:id", new EditEventController().handle);
eventRoutes.delete("/:id", new DeleteEventController().handle);

export { eventRoutes };
