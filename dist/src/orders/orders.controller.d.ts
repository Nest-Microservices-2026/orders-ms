import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
