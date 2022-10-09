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
exports.CreateEventController = void 0;
const CreateEventService_1 = require("../../services/eventServices/CreateEventService");
class CreateEventController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, date, userIds } = request.body;
            const createEventService = new CreateEventService_1.CreateEventService();
            const result = yield createEventService.execute({
                description,
                date,
                userIds,
            });
            return response.status(201).json(result);
        });
    }
}
exports.CreateEventController = CreateEventController;
//# sourceMappingURL=CreateEventController.js.map