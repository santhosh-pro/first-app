import { BadRequestException, Body, Controller, Get, Inject, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Model } from 'mongoose';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { Customer, CustomerDocument, CustomerSchema } from 'src/schemas/models/customer';
import { CustomerService } from '../get-customer-list/customer.service';
import { CreateCustomerRequest } from './create-customer-request';

@ApiTags('customers')
@Controller('customers')
export class CreateCustomerController {
  constructor(
    private readonly repository: CustomerService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) { }

  @Post()
  async create(@Body() body: CreateCustomerRequest): Promise<void> {
    const request= this.mapper.map(body,Customer,CreateCustomerRequest)
    await this.repository.create([request],null);
  }
}
