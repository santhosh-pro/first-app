export class BaseRequestModel {
    public sort?: string;
    public sortBy?: 'asc' | 'desc' = 'asc';
    public query?: string;
    public from?: string;
    public to?: string;
    public pageNumber?: number = 1;
    public pageSize?: number = 10;

    constructor() {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.sortBy = 'asc';
    }

}
