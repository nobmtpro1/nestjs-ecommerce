import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from 'src/entities/product.entity';
import {
  ProductSearchBody,
  ProductSearchResult,
} from './interfaces/product-search.interface';
import { IProductService } from '../product/interfaces/product-service.interface';

@Injectable()
export class SearchService {
  index = 'product';
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(IProductService)
    private readonly productService: IProductService,
  ) {}

  async indexProduct() {
    const products = await this.productService.getAll();
    const dataset = products.map((product) => ({
      id: product.id,
      title: product.title,
      body_html: product.body_html,
    }));

    const operations = dataset.flatMap((doc) => [
      { index: { _index: this.index } },
      doc,
    ]);

    // const bulkResponse = await this.elasticsearchService.bulk({
    //   refresh: true,
    //   operations,
    // });

    // const bulkResponse = await this.elasticsearchService.update({
    //   index: this.index,
    //   id: "DFMb-osBwRvrdfGza7ZM",
    //   body: {
    //     doc: {
    //       title: "Updated"
    //     }
    //   }
    // });

    const bulkResponse = await this.elasticsearchService.delete({
      id: 'DFMb-osBwRvrdfGza7ZM',
      index: this.index,
    });

    return bulkResponse;
  }

  async searchProduct(q: string) {
    const result = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: q,
            fuzziness: 1,
            fields: ['title', 'body_html'],
          },
        },
      },
      size: 100,
    });

    return result;
  }
}
