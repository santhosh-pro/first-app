import { CustomerModule } from './use-cases/customer-usecases/customer.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './schemas/database.module';

@Module({
  imports: [
    CustomerModule,
    DatabaseModule
  ],
  controllers: [
    AppController
  ],
  providers: [
     AppService],
})
export class AppModule { }
