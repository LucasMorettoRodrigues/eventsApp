import { prisma } from "../../prisma/client";
import { User } from "@prisma/client";
import { AppError } from "../../errors/AppError";

type CreateUserInput = {
  name: string;
};

export class CreateUserService {
  async execute({ name }: CreateUserInput): Promise<User> {
    const dbUser = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (dbUser) {
      throw new AppError("Name already in use", 400);
    }

    const user = await prisma.user.create({
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

    return user;
  }
}
