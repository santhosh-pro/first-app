import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { BaseRequestModel } from "./BaseRequestModel";


export class MongoosePaginateQuery extends BaseRequestModel {
    @ApiPropertyOptional()
    populate?: any;
    @ApiPropertyOptional()
    select?: any;
    @ApiPropertyOptional()
    lean?: boolean;
}
