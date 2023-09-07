import { Module } from '@nestjs/common';
import { DBService } from './db.service';
import { MongooseModule } from "@nestjs/mongoose";
// import { Module } from "module";


@Module({
   imports: [MongooseModule.forRootAsync({
    useClass: DBService
   })]
})

export class DBModule {}