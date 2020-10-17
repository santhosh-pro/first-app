import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { Model } from "mongoose";
import { BaseService } from "src/common/generic-repository.service";
import { MongoosePaginateQuery } from "src/common/MongoosePaginateQuery";
import { Customer, CustomerDocument } from "src/schemas/models/customer";
import { CustomerService } from "./customer.service";
import { GetCustomerListRequest } from "./get-customer-list-request";
import { GetCustomerListResponse } from "./get-customer-list-response";

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly repository: CustomerService
  ) { }

  @Get()
  async get(@Query() query: Partial<MongoosePaginateQuery>): Promise<any> {
   //const model=  await this.repository.findById(Object('5f813ae24cb6cc273cd7c92c'));

   const model=  await this.repository.getAllPaginatedData({},query);
   return model;
  }
}