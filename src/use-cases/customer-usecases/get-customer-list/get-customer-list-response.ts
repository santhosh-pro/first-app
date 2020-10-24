import { PagedResponse } from "src/common/paged-response";
import { GetCustomerBase } from "../get-customer-base";
import { GetCustomerListRequest } from "./get-customer-list-request";

export interface GetCustomerListResponse extends PagedResponse {
    items:GetCustomerBase[];
}