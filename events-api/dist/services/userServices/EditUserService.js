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
exports.EditUserService = void 0;
const client_1 = require("../../prisma/client");
const AppError_1 = require("../../errors/AppError");
class EditUserService {
    execute({ id, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            let dbUser = yield client_1.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            if (!dbUser) {
                throw new AppError_1.AppError("User does not exists.", 400);
            }
            dbUser = yield client_1.prisma.user.findUnique({
                where: {
                    name,
                },
            });
            if (dbUser) {
                throw new AppError_1.AppError("Name already in use", 400);
            }
            const updatedUser = yield client_1.prisma.user.update({
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
        });
    }
}
exports.EditUserService = EditUserService;
//# sourceMappingURL=EditUserService.js.map