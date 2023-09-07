import { UserDocument } from '../schema/user.schema';
import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()

export class UserService {


  constructor(
    @InjectModel(UserModel) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async register(body) {

    const user = await this.userModel.findOne({ email: body.email })

    if (user) {
      throw new ServiceUnavailableException('User already exsist.')
    }
    else {
      const user = await this.userModel.create(body)
      return { message: 'registered', user }
    }
  }


  async login(body) {

    console.log(body)
    const user = await this.userModel.findOne({ email: body.email })
    if (!user) {
      throw new NotFoundException('User not found.')
    }

    // const validPassword = await bcrypt.compare(body.password, user.password)
    const result = await bcrypt.compare(body.password, user.password)

    if (!result) {
      throw new BadRequestException('Email or password is incorrect.')
    }

    else {
      const payload = { sub: user.password, username: user.name }
      const token = await this.jwtService.signAsync(payload)
      return token
    }

  }

  async findOne(email) {
    return await this.userModel.findOne({ email })
  }


  async updateImage(id, body) {
    return await this.userModel.findByIdAndUpdate(id, body, { new: true })
  }

  
}
