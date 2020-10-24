
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Invoice } from './invoice';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment extends Document {
  @Prop()
  customerId:Types.ObjectId

  @Prop()
  amount:number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.virtual('invoices',{
  ref:Invoice.name,
  localField:'_id',
  foreignField:'paymentId'
})

PaymentSchema.virtual('customer',{
  ref:Payment.name,
  localField:'customerId',
  foreignField:'_id',
  justOne:true
})