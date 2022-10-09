import { prisma } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

type DeleteUserInput = {
  id: string;
};

export class DeleteUserService {
  async execute({ id }: DeleteUserInput) {
    const dbUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!dbUser) {
      throw new AppError("User does not exists.", 400);
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
