import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()

export class Products {

    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    discountPercentage: string;
    
    @Prop({ required: true })
    images: [];
    
    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ required: true })
    title: string;

}

export const ProductsSchema = SchemaFactory.createForClass(Products)
export const ProductsModel = 'Products'
export type ProductsDocument = Products & Document 
