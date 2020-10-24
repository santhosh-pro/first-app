import { BadRequestException, Body, Controller, Get, Inject, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Model } from 'mongoose';
import { Customer, CustomerDocument, CustomerSchema } from 'src/schemas/models/customer';
import { CustomerService } from '../get-customer-list/customer.service';
import { CreateCustomerMapper } from './create-customer-mapper';
import { CreateCustomerRequest } from './create-customer-request';
import { CreateCustomerService } from './create-customer.service';

@ApiTags('customers')
@Controller('customers')
export class CreateCustomerController {
  constructor(
    private readonly repository: CreateCustomerService,
    private readonly mapper:CreateCustomerMapper
  ) { }

  @Post()
  async create(@Body() body: CreateCustomerRequest): Promise<void> {
    const customer=this.mapper.request(body);
    await this.repository.create([customer],null);
  }
}
