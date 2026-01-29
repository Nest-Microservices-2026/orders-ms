import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ClientProxy } from "@nestjs/microservices";
export declare class OrdersService {
    private readonly productsClient;
    private readonly prisma;
    private readonly logger;
    constructor(productsClient: ClientProxy, prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        OrderItem: {
            name: any;
            productId: number;
            quantity: number;
            price: number;
        }[];
        id: string;
        totalAmount: number;
        totalItems: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        paid: boolean;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        totalAmount: number;
        totalItems: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        paid: boolean;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        totalAmount: number;
        totalItems: number;
        status: import("@prisma/client").$Enums.OrderStatus;
        paid: boolean;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
