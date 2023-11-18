import {
  Pagination,
  PaginationInfoInterface,
} from 'src/commons/interfaces/pagination.interface';
import { SearchFilterInterface } from '../interfaces/pagination.interface';
import { DeepPartial, FindManyOptions, ILike, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  async getAll() {
    return this.createQueryBuilder().getMany();
  }

  getPaginationInfo(options: SearchFilterInterface): PaginationInfoInterface {
    const page: number =
      typeof options.page !== 'undefined' && options.page > 0
        ? options.page
        : 1;
    const limit: number =
      typeof options.limit !== 'undefined' && options.limit > 0
        ? options.limit
        : 10;
    return {
      skip: (page - 1) * limit,
      limit,
      page,
    };
  }

  async paginate(
    searchFilter: SearchFilterInterface,
    relations: string[] = [],
    searchCriteria: string[] = [],
  ): Promise<Pagination<T>> {
    const whereCondition = [];
    const findOptions: FindManyOptions = {};
    if (searchFilter.hasOwnProperty('keywords') && searchFilter.keywords) {
      for (const key of searchCriteria) {
        whereCondition.push({
          [key]: ILike(`%${searchFilter.keywords}%`),
        });
      }
    }
    const paginationInfo: PaginationInfoInterface =
      this.getPaginationInfo(searchFilter);
    findOptions.relations = relations;
    findOptions.take = paginationInfo.limit;
    findOptions.skip = paginationInfo.skip;
    findOptions.where = whereCondition;
    findOptions.order = {
      createdAt: 'DESC',
    };
    const { page, skip, limit } = paginationInfo;
    const [results, total] = await this.findAndCount(findOptions);
    console.log(page + 1);
    return new Pagination<T>({
      results: results,
      totalItems: total,
      pageSize: limit,
      currentPage: page,
      previous: page > 1 ? page - 1 : 0,
      next: total > skip + limit ? page + 1 : 0,
    });
  }
}
