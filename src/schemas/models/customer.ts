
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Payment } from './payment';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer extends Document {
  @Prop()
  id: string;

  @Prop()
  name:string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('payments',{
  ref:Payment.name,
  localField:'_id',
  foreignField:'customerId'
})