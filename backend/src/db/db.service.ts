import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()

export class DBService implements MongooseOptionsFactory {

    constructor(private config: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const name = this.config.get('name')
        const password = this.config.get('password')
        // console.log(name, password)
        const uri = `mongodb+srv://${name}:${password}@cluster0.l0d4rjv.mongodb.net/?retryWrites=true&w=majority`
        return {
            uri
        }
    }

}
