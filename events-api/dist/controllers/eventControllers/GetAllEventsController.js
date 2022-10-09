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
exports.GetAllEventsController = void 0;
const GetAllEventsService_1 = require("../../services/eventServices/GetAllEventsService");
class GetAllEventsController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAllEventsService = new GetAllEventsService_1.GetAllEventsService();
            const { description } = request.query;
            const query = {
                description,
            };
            const result = yield getAllEventsService.execute({ query });
            return response.status(200).json(result);
        });
    }
}
exports.GetAllEventsController = GetAllEventsController;
//# sourceMappingURL=GetAllEventsController.js.map