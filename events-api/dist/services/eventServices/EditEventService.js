"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditEventService = void 0;
const client_1 = require("../../prisma/client");
const AppError_1 = require("../../errors/AppError");
class EditEventService {
    execute({ id, description, date, userIds, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbEvent = yield client_1.prisma.event.findUnique({
                where: {
                    id,
                },
            });
            if (!dbEvent) {
                throw new AppError_1.AppError("Event does not exists.", 400);
            }
            const updatedEvent = yield client_1.prisma.event.update({
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
        });
    }
}
exports.EditEventService = EditEventService;
//# sourceMappingURL=EditEventService.js.map