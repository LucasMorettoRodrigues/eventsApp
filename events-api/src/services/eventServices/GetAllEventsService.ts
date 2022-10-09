import { prisma } from "../../prisma/client";
import { Event } from "@prisma/client";

type GetAllEventsServiceInput = {
  query: {
    description: string;
  };
};

export class GetAllEventsService {
  async execute({ query }: GetAllEventsServiceInput): Promise<Event[]> {
    let dbEvents = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
      where: {
        description: {
          contains: query.description,
          mode: "insensitive",
        },
      },
      include: {
        users: {
          select: {
            user: true,
          },
        },
      },
    });

    return dbEvents;
  }
}
