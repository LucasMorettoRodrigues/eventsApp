import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { EditEventService } from "../../services/eventServices/EditEventService";
import { isDate } from "../../utils/helpers";

export class EditEventController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { description, date, userIds } = request.body;

    if (!description || !userIds || !date || !isDate(date)) {
      throw new AppError("Invalid Request.", 400);
    }

    const editEventService = new EditEventService();

    const result = await editEventService.execute({
      id,
      description,
      date,
      userIds,
    });

    return response.status(200).json(result);
  }
}
