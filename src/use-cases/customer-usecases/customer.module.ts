import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/schemas/models/customer';
import { Payment, PaymentSchema } from 'src/schemas/models/payment';
import { CreateCustomerController } from './create-customer/create-customer.controller';
import { CustomerService } from './get-customer-list/customer.service';
import { GetCustomerListController } from './get-customer-list/get-customer-list.controller';
import { CreateCustomerMapper } from "./../customer-usecases/create-customer/create-customer-mapper";
import { InvocieSchema, Invoice } from 'src/schemas/models/invoice';
import { CreateCustomerService } from './create-customer/create-customer.service';
import { AutomapperModule } from 'nestjsx-automapper';
import { GetCustomerListMapper } from './get-customer-list/get-customer-list-mapper';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema },{ name: Payment.name, schema: PaymentSchema },{ name: Invoice.name, schema: InvocieSchema }]),
        AutomapperModule.withMapper()

    ],
    controllers: [CreateCustomerController,GetCustomerListController],
    providers: [CustomerService,CreateCustomerService,CreateCustomerMapper,GetCustomerListMapper],
})
export class CustomerModule { }
