import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { request } from "express";
import { model } from "mongoose";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { MongoosePaginateQuery } from "src/common/MongoosePaginateQuery";
import { Customer } from "src/schemas/models/customer";
import { GetCustomerBase } from "../get-customer-base";
import { CustomerService } from "./customer.service";
import { GetCustomerListMapper } from "./get-customer-list-mapper";
import { GetCustomerListRequest } from "./get-customer-list-request";
import { GetCustomerListResponse } from "./get-customer-list-response";

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly repository: CustomerService,
    private readonly mapper:GetCustomerListMapper
    // @InjectMapper() private readonly mapper: AutoMapper
  ) { }
//GetCustomerListRequest
  @Get()
  async get(@Query() query: GetCustomerListRequest): Promise<any> {

   let populate=  { 
    path: 'payments',
    populate:{
      path:'invoices'
    }
  };

   const result=  await this.repository.getAllPaginatedData({},populate,query);
   const response=this.mapper.response(result);
  
   return response;
  }
}

export class SetPayment {
  amount:number
}