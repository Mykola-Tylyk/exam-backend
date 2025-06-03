export interface IQuery {
    pageSize: number;
    page: number;
    userSearch?: string;
    clinicSearch?: string;
    serviceSearch?: string;
    sort?: string;
}
