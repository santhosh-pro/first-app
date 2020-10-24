import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { GetPaymentListMapper } from './get-payment-list-mapper';
import { GetPaymentListRequest } from './get-payment-list-request';
import { GetPaymentListService } from './get-payment-list.service';

@ApiTags('payments')
@Controller('payments')
export class GetPaymentListController {
    constructor(
        private readonly repository: GetPaymentListService,
        private readonly mapper:GetPaymentListMapper
      ) { }

      @Get()
  async get(@Query() query: GetPaymentListRequest): Promise<any> {

   let populate=  { 
    path: 'customer',
    select: 'name'
    // populate:{
    //   path:'invoices'
    // }
  };

   const result=  await this.repository.paged({},populate,query);
   const response=this.mapper.response(result);
  
   return response;
  }
}
