"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const isDate = function (date) {
    const convertedDate = new Date(date);
    return convertedDate.toString() === "Invalid Date" ? false : true;
};
exports.isDate = isDate;
//# sourceMappingURL=helpers.js.map