import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from 'src/dto/category.dto';


@Controller('/category')
export class CategoryController {

    constructor(private service: CategoryService){}

    @Get('/get')
    async get() {
        return await this.service.get()
    }

    @Post('/post')
    async create(@Body(ValidationPipe) body: CategoryDTO) {
      return await this.service.create(body)
    }

}