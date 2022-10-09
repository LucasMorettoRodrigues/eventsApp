import { Request, Response } from "express";
import { GetSingleUserService } from "../../services/userServices/GetSingleUserService";

export class GetSingleUserController {
  async handle(request: Request, response: Response) {
    const getSingleUserService = new GetSingleUserService();
    const { id } = request.params;

    const result = await getSingleUserService.execute({ id });

    return response.status(200).json(result);
  }
}
