import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { CartDTO } from 'src/dto/cart.dto';
import { CartService } from './cart.service';

@Controller('/cart')

export class CartController {

  constructor(private service: CartService) {}

  @Post('/post')
  async create(@Body(ValidationPipe) body: CartDTO) {
    await this.service.post(body)
    return { message: 'added' }
  }

  @Get('/get/:email')
  async get(@Param('email') email) {
    const data = await this.service.find(email)
    console.log(data)
    return data

  }

}