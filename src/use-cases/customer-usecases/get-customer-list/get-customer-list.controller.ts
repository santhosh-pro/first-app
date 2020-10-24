import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger/dist/decorators";
import { CustomerService } from "./customer.service";
import { GetCustomerListMapper } from "./get-customer-list-mapper";
import { GetCustomerListRequest } from "./get-customer-list-request";

@ApiTags('customers')
@Controller('customers')
export class GetCustomerListController {
  constructor(
    private readonly repository: CustomerService,
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

    const result = await this.repository.paged({}, populate, query);
    const response = this.mapper.response(result);

    return response;
  }
}

export class SetPayment {
  amount: number
}