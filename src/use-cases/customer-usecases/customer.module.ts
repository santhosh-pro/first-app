import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/schemas/models/customer';
import { Payment, PaymentSchema } from 'src/schemas/models/payment';
import { CreateCustomerController } from './create-customer/create-customer.controller';
import { CustomerService } from './get-customer-list/customer.service';
import { GetCustomerListController } from './get-customer-list/get-customer-list.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema },{ name: Payment.name, schema: PaymentSchema }]),
    ],
    controllers: [CreateCustomerController,GetCustomerListController],
    providers: [CustomerService, 
    ],
})
export class CustomerModule { }
