import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { CreateUserService } from "../../services/userServices/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    if (!name) {
      throw new AppError("Invalid Request.", 400);
    }

    const createUserService = new CreateUserService();

    const result = await createUserService.execute({ name });

    return response.status(201).json(result);
  }
}
