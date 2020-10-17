import { ApiPropertyOptional } from "@nestjs/swagger/dist/decorators/api-property.decorator";


export class BaseRequestModel {
    @ApiPropertyOptional()
    public sort?: string;
    @ApiPropertyOptional()
    public sortBy?: 'asc' | 'desc' = 'asc';
    @ApiPropertyOptional()
    public query?: string;
    @ApiPropertyOptional()
    public from?: string;
    @ApiPropertyOptional()
    public to?: string;
    @ApiPropertyOptional()
    public page?: number = 1;
    @ApiPropertyOptional()
    public count?: number = 10;

    constructor() {
        this.page = 1;
        this.count = 10;
        this.sortBy = 'asc';
    }

}
