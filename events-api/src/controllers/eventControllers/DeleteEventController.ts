import { Request, Response } from "express";
import { DeleteEventService } from "../../services/eventServices/DeleteEventService";

export class DeleteEventController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteEventService = new DeleteEventService();

    await deleteEventService.execute({ id });

    return response
      .status(200)
      .json({ status: "success", message: "Event deleted successfully." });
  }
}
