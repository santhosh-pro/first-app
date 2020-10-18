import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { MongoosePaginateQuery } from "src/common/MongoosePaginateQuery";
import { CustomerService } from "./customer.service";
import { GetCustomerListRequest } from "./get-customer-list-request";

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly repository: CustomerService
  ) { }

  @Get()
  async get(@Query() query: GetCustomerListRequest): Promise<any> {
   //const model=  await this.repository.findById(Object('5f813ae24cb6cc273cd7c92c'));

   const model=  await this.repository.getAllPaginatedData({},query);
   return model;
  }
}