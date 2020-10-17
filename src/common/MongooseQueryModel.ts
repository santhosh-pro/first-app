import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsOptional } from 'class-validator';

export class MongooseQueryModel {
    @ApiPropertyOptional()
    filter: any;
    @ApiPropertyOptional()
    populate?: any;
    @ApiPropertyOptional()
    select?: string;
    @ApiPropertyOptional()
    lean?: boolean;
    @ApiPropertyOptional()
    sort?: string;
    @ApiPropertyOptional()
    sortBy?: 'asc' | 'desc' = 'asc';
    @ApiPropertyOptional()
    limit?: number;
}
