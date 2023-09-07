import { MongooseModule } from '@nestjs/mongoose';
import { CartModel, CartSchema } from './../schema/cart.schema';
import { CartController } from './cart.controller';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: CartModel, schema: CartSchema }])],
    controllers: [CartController],
    providers: [CartService],
})

export class CartModule {};