import { Module, forwardRef } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      maxRetries: 100,
    }),
    forwardRef(() => ProductModule),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
