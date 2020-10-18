import { AutoMapper, ProfileBase } from "nestjsx-automapper";
import { Profile } from "nestjsx-automapper/dist/decorators/profile.decorator";
import { PagedModel } from "src/common/paged-model";
import { Customer } from "src/schemas/models/customer";
import { GetCustomerBase } from "../get-customer-base";
import { GetCustomerListResponse } from "./get-customer-list-response";

@Profile()
class GetCustomerListMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();

        mapper.createMap(Customer, GetCustomerBase);
        //mapper.createMap(PagedModel<CustomerSchema>, GetCustomerListResponse);
    }
}