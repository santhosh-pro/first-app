import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Customer, CustomerSchema } from 'src/persistence/customers-aggregate/customer.schema.';
import { InvocieSchema, Invoice } from 'src/persistence/models/invoice';
import { Payment, PaymentSchema } from 'src/persistence/payment-aggregate/payment';
import { CustomerService } from './customers-aggregate/customer.service';
import { ICustomerService } from './customers-aggregate/i.customer.service';
import { IPaymentService } from './payment-aggregate/i.payment.service';
import { PaymentService } from './payment-aggregate/payment.service';
@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: Customer.name, schema: CustomerSchema },
                { name: Payment.name, schema: PaymentSchema },
                { name: Invoice.name, schema: InvocieSchema }
            ]
        )
    ],
    controllers: [],
    providers: [{
        provide:ICustomerService,
        useClass:CustomerService
    },
    {
        provide:IPaymentService,
        useClass:PaymentService
    }],
    exports:[
        MongooseModule.forFeature(
            [
                { name: Customer.name, schema: CustomerSchema },
                { name: Payment.name, schema: PaymentSchema },
                { name: Invoice.name, schema: InvocieSchema }
            ]
        ),
        {
            provide:ICustomerService,
            useClass:CustomerService
        },
        {
            provide:IPaymentService,
            useClass:PaymentService
        }
    ]
})
export class DatabaseModule { }
