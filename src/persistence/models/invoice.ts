
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice extends Document {
  @Prop()
  id: string;

  @Prop()
  amount:number;
  
  @Prop()
  paymentId:Types.ObjectId
}

export const InvocieSchema = SchemaFactory.createForClass(Invoice);

InvocieSchema.virtual('payments',{
    ref:Invoice.name,
    localField:'paymentId',
    foreignField:'id',
    justOne:true
  })