import {PagingParams} from "../../../common/paging-params";
export class GetCustomerListRequest extends PagingParams  {
    constructor(partial: Partial<GetCustomerListRequest>) {
        super();
        Object.assign(this, partial);
      }
}