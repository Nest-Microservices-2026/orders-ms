import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/service';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    ClientsModule.register(
      [{
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.product_host,
          port: envs.product_port,
        }

      }]
    )
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
