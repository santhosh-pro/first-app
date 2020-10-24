import { Module } from '@nestjs/common';
import { CreateCustomerController } from './create-customer/create-customer.controller';
import { CustomerService } from './get-customer-list/customer.service';
import { GetCustomerListController } from './get-customer-list/get-customer-list.controller';
import { CreateCustomerMapper } from "./../customer-usecases/create-customer/create-customer-mapper";
import { CreateCustomerService } from './create-customer/create-customer.service';
import { GetCustomerListMapper } from './get-customer-list/get-customer-list-mapper';
import { DatabaseModule } from 'src/schemas/database.module';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [CreateCustomerController,GetCustomerListController],
    providers: [CustomerService,CreateCustomerService,CreateCustomerMapper,GetCustomerListMapper],
})
export class CustomerModule { }
