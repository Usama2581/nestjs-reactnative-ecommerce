import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './db/db.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
    UserModule,
    CategoryModule,
    ProductsModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
