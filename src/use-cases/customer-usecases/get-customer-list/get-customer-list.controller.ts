import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { MongoosePaginateQuery } from "src/common/MongoosePaginateQuery";
import { Customer } from "src/schemas/models/customer";
import { CustomerService } from "./customer.service";
import { GetCustomerListRequest } from "./get-customer-list-request";
import { GetCustomerListResponse } from "./get-customer-list-response";

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly repository: CustomerService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) { }

  @Get()
  async get(@Query() query: GetCustomerListRequest): Promise<any> {
   //const model=  await this.repository.findById(Object('5f813ae24cb6cc273cd7c92c'));
    let q=query;
   const model=  await this.repository.getAllPaginatedData({},query);
   this.mapper.map(model,GetCustomerListResponse)
   return model;
  }
}