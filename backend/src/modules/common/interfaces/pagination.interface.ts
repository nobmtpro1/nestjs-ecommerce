import { EQueryOrder } from '../enums/query.enums';

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

export interface SearchOrderInterface {
  orderBy: string;
  order: EQueryOrder;
}

export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public currentPage: number;
  public pageSize: number;
  public totalItems: number;
  public next: number;
  public previous: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    const { totalItems, results, currentPage, pageSize } = paginationResults;
    const lastPage = Math.ceil(totalItems / pageSize);
    this.results = results;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.previous = currentPage > 1 ? currentPage - 1 : 1;
    this.next = currentPage >= lastPage ? lastPage : currentPage + 1;
  }
}
