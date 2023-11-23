import { Product } from 'src/entities/product.entity';
import {
  CreateProductDto,
  SearchProductDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { ProductStatusView } from 'src/modules/product/enums/product.enum';
import { Pagination } from 'src/modules/common/interfaces/pagination.interface';

export interface IProductService {
  get(query: SearchProductDto): Promise<Pagination<Product>>;

  getAll(): Promise<Product[]>;

  getProductStatus(): ProductStatusView[];

  create(body: CreateProductDto): Promise<Product>;

  bulkCreate(body: any): Promise<Product[]>;

  findById(id: number): Promise<Product>;

  findBySlug(handle: string): Promise<Product>;

  update(product: Product, body: UpdateProductDto): Promise<Product>;

  generateSlug(inputSlug: string, product?: Product): Promise<string>;

  delete(product: Product): Promise<Product>;
}

export const IProductService = Symbol('IProductService');
