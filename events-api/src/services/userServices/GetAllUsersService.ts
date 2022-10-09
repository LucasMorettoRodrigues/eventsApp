import { prisma } from "../../prisma/client";
import { User } from "@prisma/client";

type GetAllUsersServiceInput = {
  query: {
    name: string;
  };
};

export class GetAllUsersService {
  async execute({ query }: GetAllUsersServiceInput): Promise<User[]> {
    const dbUsers = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        name: {
          contains: query.name,
          mode: "insensitive",
        },
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

    return dbUsers;
  }
}
