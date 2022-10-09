import { prisma } from "../../prisma/client";
import { Event } from "@prisma/client";

type CreateEventInput = {
  description: string;
  date: Date;
  userIds: string[];
};

export class CreateEventService {
  async execute({
    description,
    date,
    userIds,
  }: CreateEventInput): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        description,
        date,
        users: {
          create: userIds.map((id) => ({
            user: {
              connect: { id },
            },
          })),
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

    return event;
  }
}
