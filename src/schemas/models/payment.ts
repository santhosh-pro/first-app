
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from './customer';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment extends Document {
  @Prop()
  customerId:Types.ObjectId

  @Prop()
  amount:number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.virtual('customers',{
  ref:Payment.name,
  localField:'customerId',
  foreignField:'id',
  justOne:true
})