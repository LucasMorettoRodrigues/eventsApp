import { prisma } from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { User } from "@prisma/client";

type EditUserInput = {
  id: string;
  name: string;
};

export class EditUserService {
  async execute({ id, name }: EditUserInput): Promise<User> {
    let dbUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!dbUser) {
      throw new AppError("User does not exists.", 400);
    }

    dbUser = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (dbUser) {
      throw new AppError("Name already in use", 400);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
      include: {
        events: {
          orderBy: {
            event: {
              date: "asc",
            },
          },
          select: {
            event: true,
          },
        },
      },
    });

    return updatedUser;
  }
}
