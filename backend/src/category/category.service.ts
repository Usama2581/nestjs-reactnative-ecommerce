import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument, CategoryModel } from 'src/schema/category.schema';

@Injectable()

export class CategoryService {

    constructor(@InjectModel(CategoryModel) private model: Model<CategoryDocument>) {}

    async create(body) {
        return await this.model.create(body)
    }

    async get() {
        return await this.model.find()
    }
}
