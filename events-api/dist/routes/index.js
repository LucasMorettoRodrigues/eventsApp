"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const event_routes_1 = require("./event.routes");
const user_routes_1 = require("./user.routes");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/users", user_routes_1.userRoutes);
routes.use("/events", event_routes_1.eventRoutes);
//# sourceMappingURL=index.js.map