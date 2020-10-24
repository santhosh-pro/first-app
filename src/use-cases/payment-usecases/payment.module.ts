import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/schemas/models/customer';
import { InvocieSchema, Invoice } from 'src/schemas/models/invoice';
import { Payment, PaymentSchema } from 'src/schemas/models/payment';
import { GetPaymentListMapper } from './get-payment-list/get-payment-list-mapper';
import { GetPaymentListController } from './get-payment-list/get-payment-list.controller';
import { GetPaymentListService } from './get-payment-list/get-payment-list.service';

@Module({
    imports: [ MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema },{ name: Payment.name, schema: PaymentSchema },{ name: Invoice.name, schema: InvocieSchema }])],
    controllers: [GetPaymentListController],
    providers: [GetPaymentListService,GetPaymentListMapper],
})
export class PaymentModule { }
