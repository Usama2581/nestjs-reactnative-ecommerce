import { UserLoginDto } from 'src/dto/user-login.dto';
import { UserRegisterDto } from 'src/dto/user-register.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, Put, Req, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('/auth')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('/register')
  async register(@Body(ValidationPipe) body: UserRegisterDto) {
    await this.userService.register(body)
    return { message: 'registered' }
  }

  @Post('/login')
  async login(@Body(ValidationPipe) body: UserLoginDto, @Res() res: Response) {
    // console.log('login')
    const token = await this.userService.login(body)
    // console.log(token)

    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 10000000) //expire in 10 seconds
    })

    // return { message: 'loggedin' }
    
    res.send({ message: 'loggedin' })
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email) {

    return await this.userService.findOne(email)
  }

  @Put('/put/:id')
  async upadte(@Body() body, @Param('id') id) {
  
    return await this.userService.updateImage(id, body)
  
  }

  
  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    const cookies = req.cookies
    console.log(cookies)
    if (!cookies.jwt) {
      throw new BadRequestException('Login first')
    }
    else {
      res.clearCookie('jwt')
      res.send({ message: 'loggedout ' })
    }

  }



}
