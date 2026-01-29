"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusList = void 0;
const client_1 = require("@prisma/client");
exports.OrderStatusList = [
    client_1.OrderStatus.PENDING,
    client_1.OrderStatus.CANCELLED,
    client_1.OrderStatus.DELIVERED
];
//# sourceMappingURL=orders.enum.js.map