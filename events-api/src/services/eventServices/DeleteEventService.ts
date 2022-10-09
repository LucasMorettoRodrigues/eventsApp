import { prisma } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

type DeleteEventInput = {
  id: string;
};

export class DeleteEventService {
  async execute({ id }: DeleteEventInput) {
    const dbEvent = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!dbEvent) {
      throw new AppError("Event does not exists.", 400);
    }

    await prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
