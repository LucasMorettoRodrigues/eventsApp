import { prisma } from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { Event } from "@prisma/client";

type EditEventInput = {
  id: string;
  description: string;
  date: Date;
  userIds: string[];
};

export class EditEventService {
  async execute({
    id,
    description,
    date,
    userIds,
  }: EditEventInput): Promise<Event> {
    const dbEvent = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!dbEvent) {
      throw new AppError("Event does not exists.", 400);
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        description,
        date,
        users: {
          deleteMany: {},
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

    return updatedEvent;
  }
}
