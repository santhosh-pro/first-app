import { PagedResponse } from "src/common/paged-response";
import { GetPaymentBase } from "src/use-cases/customer-usecases/get-customer-base";

export class GetPaymentResponse extends PagedResponse {
    items:GetPaymentBase[];
}