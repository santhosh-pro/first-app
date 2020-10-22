import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { model } from "mongoose";
import { AutoMapper, InjectMapper } from "nestjsx-automapper";
import { MongoosePaginateQuery } from "src/common/MongoosePaginateQuery";
import { Customer } from "src/schemas/models/customer";
import { GetCustomerBase } from "../get-customer-base";
import { CustomerService } from "./customer.service";
import { GetCustomerListRequest } from "./get-customer-list-request";
import { GetCustomerListResponse } from "./get-customer-list-response";

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly repository: CustomerService,
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
    // populate: {
    //   path: 'components',
    //   model: 'Component'
    // }
  };

   const result=  await this.repository.getAllPaginatedData({},populate,query);

   let list:GetCustomerBase[]=[];
   result.items.forEach((item:any) => {
     list.push({
       id:item._id,
       name:item.name,
       payments:item.payments
     })
   });

   let response:Partial<GetCustomerListResponse>={
    page :result.pageNumber,
    size:result.pageSize,
    totalCount:result.totalItems,
    items:list
   }
   return response;
  }
}

export class SetPayment {
  amount:number
}