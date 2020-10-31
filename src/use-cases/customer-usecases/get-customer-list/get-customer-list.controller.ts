import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { GetCustomerListMapper } from "./get-customer-list-mapper";
import { GetCustomerListRequest } from "./get-customer-list-request";

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly mapper: GetCustomerListMapper
  ) { }

  @Get()
  async get(@Query() query: GetCustomerListRequest): Promise<any> {

    let populate = {
      path: 'payments',
      populate: {
        path: 'invoices'
      }
    };

    // const result = await this.repository.pagedAsync(query.pageNumber,query.pageSize,query.orderByPropertyName,query.sortingDirection,{},populate,null);
    // const response = this.mapper.response(result);

    return null;
  }
}