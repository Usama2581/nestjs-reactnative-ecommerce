import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModel, ProductsSchema } from 'src/schema/products.schema';


@Module({
    imports: [MongooseModule.forFeature([{ name: ProductsModel, schema: ProductsSchema }])],
    controllers: [ProductsController],
    providers: [ProductsService],
})

export class ProductsModule {};