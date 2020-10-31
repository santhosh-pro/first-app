import { PagedResponse } from "src/common/paged-response";
import { SortingDirection } from "src/common/sorting-direction";
import { Payment } from "src/persistence/payment-aggregate/payment";
import { GetPaymentBase } from "../get-payment-base";
import { GetPaymentListResponse } from "./get-payment-list-response";

export class GetPaymentListMapper {
    constructor() { }

    response(request: PagedResponse<Payment>): GetPaymentListResponse {
        let items:GetPaymentBase[]=[];

        request.items.forEach((item:Payment) => {
            items.push(
                {
                    id:item.id,
                    customerName:item.customer===null?'':item.customer.name,
                    amount:item.amount,
                    customerId:String(item.customerId)
                }
            )
        });

        // let response:GetPaymentListResponse ={
        // totalCount:request.totalItems,
        // page:request.pageNumber,
        // orderByPropertyName:'',
        // sortDirection:SortingDirection.Ascending,
        // items:items,
        // size:request.pageSize
        // }
        return null;
    }
}