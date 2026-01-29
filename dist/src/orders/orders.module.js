"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const microservices_1 = require("@nestjs/microservices");
const service_1 = require("../config/service");
const envs_1 = require("../config/envs");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([{
                    name: service_1.PRODUCT_SERVICE,
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: envs_1.envs.product_host,
                        port: envs_1.envs.product_port,
                    }
                }])
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map