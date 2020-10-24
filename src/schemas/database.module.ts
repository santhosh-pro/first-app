import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Customer, CustomerSchema } from 'src/schemas/models/customer';
import { InvocieSchema, Invoice } from 'src/schemas/models/invoice';
import { Payment, PaymentSchema } from 'src/schemas/models/payment';
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
    providers: [],
    exports:[
        MongooseModule.forFeature(
            [
                { name: Customer.name, schema: CustomerSchema },
                { name: Payment.name, schema: PaymentSchema },
                { name: Invoice.name, schema: InvocieSchema }
            ]
        )
    ]
})
export class DatabaseModule { }
