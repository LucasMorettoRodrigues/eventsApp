import { Request, Response } from "express";
import { GetAllEventsService } from "../../services/eventServices/GetAllEventsService";

type Query = {
  description: string;
};

export class GetAllEventsController {
  async handle(request: Request, response: Response) {
    const getAllEventsService = new GetAllEventsService();
    const { description } = request.query as Query;

    const query = {
      description,
    };

    const result = await getAllEventsService.execute({ query });

    return response.status(200).json(result);
  }
}
