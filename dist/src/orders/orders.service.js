"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const microservices_1 = require("@nestjs/microservices");
const service_1 = require("../config/service");
const rxjs_1 = require("rxjs");
let OrdersService = class OrdersService {
    productsClient;
    prisma;
    logger = new common_1.Logger("OrderService");
    constructor(productsClient, prisma) {
        this.productsClient = productsClient;
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        try {
            const ids = createOrderDto.items.map((item) => item.productId);
            const products = await (0, rxjs_1.firstValueFrom)(this.productsClient.send({ cmd: "validate_products" }, ids));
            const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
                const price = products.find((products) => products.id === orderItem.productId).price;
                return price * orderItem.quantity;
            }, 0);
            const totalItem = createOrderDto.items.reduce((acc, orderItem) => {
                return acc + orderItem.quantity;
            }, 0);
            const order = await this.prisma.order.create({
                data: {
                    totalAmount: totalAmount,
                    totalItems: totalItem,
                    OrderItem: {
                        createMany: {
                            data: createOrderDto.items.map((orderItem) => ({
                                price: products.find((product) => product.id === orderItem.productId).price,
                                productId: orderItem.productId,
                                quantity: orderItem.quantity,
                            })),
                        },
                    },
                },
                include: {
                    OrderItem: {
                        select: {
                            price: true,
                            quantity: true,
                            productId: true,
                        },
                    },
                },
            });
            return {
                ...order,
                OrderItem: order.OrderItem.map((orderItem) => ({
                    ...orderItem,
                    name: products.find((product) => product.id === orderItem.productId)
                        .name,
                })),
            };
        }
        catch (error) {
            console.log(error);
            throw new microservices_1.RpcException({
                message: `err`,
                status: common_1.HttpStatus.BAD_REQUEST,
            });
        }
    }
    findAll() {
        return this.prisma.order.findMany();
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({ where: { id: id } });
        if (!order) {
            throw new microservices_1.RpcException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: `order with id ${id} not found`,
            });
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(service_1.PRODUCT_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map