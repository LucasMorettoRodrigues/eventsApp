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
exports.EditEventController = void 0;
const AppError_1 = require("../../errors/AppError");
const EditEventService_1 = require("../../services/eventServices/EditEventService");
const helpers_1 = require("../../utils/helpers");
class EditEventController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { description, date, userIds } = request.body;
            if (!description || !userIds || !date || !(0, helpers_1.isDate)(date)) {
                throw new AppError_1.AppError("Invalid Request.", 400);
            }
            const editEventService = new EditEventService_1.EditEventService();
            const result = yield editEventService.execute({
                id,
                description,
                date,
                userIds,
            });
            return response.status(200).json(result);
        });
    }
}
exports.EditEventController = EditEventController;
//# sourceMappingURL=EditEventController.js.map