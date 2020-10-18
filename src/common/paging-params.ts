import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";
import { SortDirection } from "./sorting-direction";

export class PagingParams {
    @ApiPropertyOptional()
    pageNumber: number;
    @ApiPropertyOptional()
    pageSize: number;
    @ApiPropertyOptional()
    sortingDirection: SortDirection;
    @ApiPropertyOptional()
    orderByPropertyName: string;
    @ApiPropertyOptional()
    searchKey: string;
}