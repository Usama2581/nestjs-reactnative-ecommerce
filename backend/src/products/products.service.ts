import { Model } from 'mongoose';
import { Injectable, Inject, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsModel, ProductsDocument } from 'src/schema/products.schema';


@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(ProductsModel) private productsModel: Model<ProductsDocument>
    ) { }

    async find(param) {
        console.log(param)
        return await this.productsModel.find({ category: param })
    }

    async findAll() {
        // console.log(param)
        return await this.productsModel.find()
    }

    async create(body) {
        return await this.productsModel.create(body)
    }

    //to delete a field from all documents
    async updateAll() {
        const result = await this.productsModel.updateMany({}, { $unset: { id: null }})
       return result
    }

}