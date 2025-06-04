export interface IQuery {
    pageSize: number;
    page: number;
    userSearch?: string;
    clinicSearch?: string;
    serviceSearch?: string;
    userSort?: string;
    clinicSort?: string;
    serviceSort?: string;
}
