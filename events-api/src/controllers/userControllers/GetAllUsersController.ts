import { Request, Response } from "express";
import { GetAllUsersService } from "../../services/userServices/GetAllUsersService";

type Query = {
  name: string;
};

export class GetAllUsersController {
  async handle(request: Request, response: Response) {
    const getAllUsersService = new GetAllUsersService();
    const { name } = request.query as Query;

    const query = {
      name,
    };

    const result = await getAllUsersService.execute({ query });

    return response.status(200).json(result);
  }
}
