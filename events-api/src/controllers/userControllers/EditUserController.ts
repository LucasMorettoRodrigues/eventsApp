import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { EditUserService } from "../../services/userServices/EditUserService";

export class EditUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      throw new AppError("Invalid Request.", 400);
    }

    const editUserService = new EditUserService();

    const result = await editUserService.execute({ id, name });

    return response.status(200).json(result);
  }
}
