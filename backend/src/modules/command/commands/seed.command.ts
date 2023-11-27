import { Command, CommandRunner } from 'nest-commander';
import { hashPassword } from 'src/modules/common/helpers';
import { Role } from 'src/modules/authorization/enums/role.enum';
import { DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { User } from 'src/modules/user/entities/user.entity';
import { GHNService } from 'src/modules/ghn/ghn.service';
import { ProductService } from 'src/modules/product/services/product.service';
import products from './seed-data/products';
import { CreateProductDto } from 'src/modules/product/dtos/product.dto';
import { IProductService } from 'src/modules/product/interfaces/product-service.interface';

@Command({ name: 'seed', description: 'A parameter parse' })
export class SeedCommand extends CommandRunner {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly ghnService: GHNService,
    @Inject(IProductService)
    private readonly productService: IProductService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.seedUser();
    await this.seedAddress();
    await this.seedProduct();
  }

  async seedUser() {
    try {
      const user = {
        name: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('123'),
        roles: [Role.ADMIN, Role.USER],
        permissions: [],
      };
      const findUser = await this.dataSource.manager.findOneBy(User, {
        email: user.email,
      });
      console.log(findUser);
      if (!findUser) {
        await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(User)
          .values([
            {
              name: 'admin',
              email: 'admin@gmail.com',
              phone: '0855566906',
              password: await hashPassword('123'),
              roles: [Role.ADMIN, Role.USER],
              permissions: [],
            },
          ])
          .execute();
      }
    } catch (error) {
      this.logger.error('seedUser fail', { error });
    }
  }

  async seedAddress() {
    try {
      await this.ghnService.syncAddress();
    } catch (error) {
      this.logger.error('seedAddress fail', { error: error.message });
    }
  }

  async seedProduct() {
    try {
      await this.productService.bulkCreate(products);
    } catch (error) {
      this.logger.error('seedAddress fail', { error: error.message });
    }
  }
}
