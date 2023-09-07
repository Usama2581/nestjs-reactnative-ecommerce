import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // somewhere in your initialization file
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const port  = process.env.PORT || 3000
  await app.listen(port);
  console.log('server is running at '+ port)
  
}

bootstrap();
