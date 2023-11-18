import { Product } from 'src/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { ProductStatusView } from 'src/modules/product/enums/product.enum';

export interface IProductService {
  get({ search }: { search?: string }): Promise<Product[]>;

  getProductStatus(): ProductStatusView[];

  create(body: CreateProductDto): Promise<Product>;

  findById(id: number): Promise<Product>;

  findBySlug(handle: string): Promise<Product>;

  update(product: Product, body: UpdateProductDto): Promise<Product>;

  generateSlug(inputSlug: string, product?: Product): Promise<string>;

  delete(product: Product): Promise<Product>;
}

export const IProductService = Symbol('IProductService');
