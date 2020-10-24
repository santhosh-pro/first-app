import { BasePaginatedResponse } from "src/common/BaseResponseModel";
import { SortingDirection } from "src/common/sorting-direction";
import { Customer } from "src/schemas/models/customer";
import { GetCustomerBase } from "../get-customer-base";
import { GetCustomerListResponse } from "./get-customer-list-response";

export class GetCustomerListMapper {
  constructor() {
  }

  public response(request: BasePaginatedResponse<Customer>): GetCustomerListResponse {

    let customers: GetCustomerBase[] = [];
    request.items.forEach((item: any) => {
      customers.push({
        id: item._id,
        name: item.name,
        payments: item.payments
      })
    });


    let response: GetCustomerListResponse = {
      orderByPropertyName: '',
      sortDirection: SortingDirection.Ascending,
      page: request.pageNumber,
      size: request.pageSize,
      totalCount: request.totalItems,
      items: customers
    }
    return response;
  }
}