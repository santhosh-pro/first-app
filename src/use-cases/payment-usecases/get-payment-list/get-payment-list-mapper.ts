import { BasePaginatedResponse } from "src/common/BaseResponseModel";
import { Payment } from "src/schemas/models/payment";
import { GetPaymentResponse } from "./get-payment-list-response";

export class GetPaymentListMapper {
    constructor() {}

    response(request: BasePaginatedResponse<Payment>):any{
        return request;
    }
}