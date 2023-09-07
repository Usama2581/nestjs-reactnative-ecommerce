import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('/products')

export class ProductsController {

    constructor(private service: ProductsService){}

    @Post('/add')
    async create(@Body() body) {
        console.log(body)
        await this.service.create(body)
        return { message: 'ad posted' }
    }

    @Get('/get/:data')
    async get (@Param('data') param) {
        // console.log(param)
        return await this.service.find(param)
    }

   @Get('/get')
   async getAll () {
    return await this.service.findAll()
   }

   @Put('/put')
   async update() {
    return await this.service.updateAll()
   }

  
   
}