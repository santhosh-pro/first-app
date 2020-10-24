import { SortingDirection } from "./sorting-direction";

export class PagedResponse {
    size: number;
    page: number;
    totalCount: number;
    orderByPropertyName: string;
    sortDirection: SortingDirection;
}