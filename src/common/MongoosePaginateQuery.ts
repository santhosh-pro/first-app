import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { BaseRequestModel } from "./BaseRequestModel";


export class MongoosePaginateQuery extends BaseRequestModel {
    populate?: any;
    select?: any;
    lean?: boolean;
}
