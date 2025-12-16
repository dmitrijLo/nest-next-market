import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { OrdersModule } from './orders/orders.module';
import { Customer } from './customer/entities/customer.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSrv: ConfigService) => ({
        type: 'postgres',
        url: configSrv.getOrThrow<string>('DATABASE_URL'),
        entities: [Product, Customer, Order, OrderItem],
        synchronize: configSrv.get('NODE_ENV') !== 'production', // ONLY FOR DEVELOPMENT!!!
      }),
    }),
    ProductsModule,
    CustomerModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
