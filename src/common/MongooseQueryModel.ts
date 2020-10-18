import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsOptional } from 'class-validator';

export class MongooseQueryModel {
    filter: any;
    populate?: any;
    select?: string;
    lean?: boolean;
    sort?: string;
    sortBy?: 'asc' | 'desc' = 'asc';
    limit?: number;
}
