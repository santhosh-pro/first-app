import { BadRequestException, Body, Controller, Get, Inject, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Model } from 'mongoose';
import { Customer, CustomerDocument, CustomerSchema } from 'src/schemas/models/customer';
import { CreateCustomerRequest } from './create-customer-request';

@ApiTags('customers')
@Controller('customers')
export class CreateCustomerController {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
  ) { }

  @Post()
  async create(@Body() body: CreateCustomerRequest): Promise<void> {
   const customer=new  this.customerModel(body);
  }
}
