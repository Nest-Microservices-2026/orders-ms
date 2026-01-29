import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { PRODUCT_SERVICE } from "src/config/service";
import { firstValueFrom } from "rxjs";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger("OrderService");

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const ids = createOrderDto.items.map((item) => item.productId);
      const products = await firstValueFrom(
        this.productsClient.send({ cmd: "validate_products" }, ids),
      ); // this is a observer

      const totalAmount: number = createOrderDto.items.reduce((acc, orderItem) => {
        const price = products.find(
          (products) => products.id === orderItem.productId,
        ).price;
        return price * orderItem.quantity;
      }, 0);

      const totalItem: number = createOrderDto.items.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0);

      const order = await this.prisma.order.create({
        data: {
          totalAmount: totalAmount,
          totalItems: totalItem,
          OrderItem: {
            createMany: {
              data: createOrderDto.items.map((orderItem) => ({
                price: products.find(
                  (product) => product.id === orderItem.productId,
                ).price,
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
    } catch (error) {
      console.log(error);
      throw new RpcException({
        message: `err`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id: id } });

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `order with id ${id} not found`,
      });
    }
    return order;
  }
}
