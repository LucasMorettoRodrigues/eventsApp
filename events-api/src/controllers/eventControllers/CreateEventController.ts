import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { CreateEventService } from "../../services/eventServices/CreateEventService";
import { isDate } from "../../utils/helpers";

export class CreateEventController {
  async handle(request: Request, response: Response) {
    const { description, date, userIds } = request.body;

    if (!description || !userIds || !date || !isDate(date)) {
      throw new AppError("Invalid Request.", 400);
    }

    const createEventService = new CreateEventService();

    const result = await createEventService.execute({
      description,
      date,
      userIds,
    });

    return response.status(201).json(result);
  }
}
