import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Image } from 'src/modules/image/entities/image.entity';
import { BaseRepository } from 'src/modules/common/repositories/base.repository';

@Injectable()
export class ImageRepository extends BaseRepository<Image> {
  constructor(private dataSource: DataSource) {
    super(Image, dataSource.createEntityManager());
  }
}
