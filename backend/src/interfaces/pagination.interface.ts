export interface PaginationInfoInterface {
  skip: number;
  limit: number;
  page: number;
}

export interface SearchFilterInterface {
  keywords?: string;
  limit?: number;
  page?: number;
}

export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  next: number;
  previous: number;
}

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public currentPage: number;
  public pageSize: number;
  public totalItems: number;
  public next: number;
  public previous: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.results = paginationResults.results;
    this.currentPage = paginationResults.currentPage;
    this.pageSize = paginationResults.pageSize;
    this.totalItems = paginationResults.totalItems;
    this.next = paginationResults.next;
    this.previous = paginationResults.previous;
  }
}
