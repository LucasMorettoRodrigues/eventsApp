import { prisma } from "../../prisma/client";
import { User } from "@prisma/client";
import { AppError } from "../../errors/AppError";

type GetSingleUserServiceInput = {
  id: string;
};

export class GetSingleUserService {
  async execute({ id }: GetSingleUserServiceInput): Promise<User> {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: id,
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

    if (!dbUser) {
      throw new AppError("User does not exists.", 400);
    }

    return dbUser;
  }
}
