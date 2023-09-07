import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel, CategorySchema } from 'src/schema/category.schema';


@Module({
    imports: [MongooseModule.forFeature([
        { name: CategoryModel, schema: CategorySchema }]
    )],
    controllers: [CategoryController],
    providers: [CategoryService],
})

export class CategoryModule {};