import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Category {

    @Prop({ required: true, default: [] })
    category: [];

}


export const CategorySchema = SchemaFactory.createForClass(Category)
export const CategoryModel = 'Category'
export type CategoryDocument = Category & Document
