import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartDocument, CartModel } from 'src/schema/cart.schema';


@Injectable()
export class CartService {

    constructor(@InjectModel(CartModel) private readonly cartModel: Model<CartDocument>) { 
        // console.log(cartModel)
    }

    async post(body) {
        return await this.cartModel.create(body)
    }

    async find(email) {
        // console.log('ser', email)
        return await this.cartModel.find({ email: email })
        // console.log('servi',data)
         
    }

}