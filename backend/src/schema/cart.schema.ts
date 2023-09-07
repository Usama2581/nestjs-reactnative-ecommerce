import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Products } from "./products.schema";
import { Document } from "mongoose";

@Schema()

export class Cart extends Products {
    
    @Prop({ required: true })
    email: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart)
export const CartModel = 'Cart'
export type CartDocument = Cart & Document