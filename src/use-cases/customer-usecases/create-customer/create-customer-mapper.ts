import { AutoMapper, Profile, ProfileBase } from "nestjsx-automapper";
import { Customer } from "src/schemas/models/customer";
import { CreateCustomerRequest } from "./create-customer-request";

@Profile()
export class CreateCustomerMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();

        mapper.createMap(CreateCustomerRequest, Customer);
   }
}