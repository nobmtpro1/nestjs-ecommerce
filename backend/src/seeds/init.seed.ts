import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { hashPassword } from '../commons/helpers';
import { Role } from '../enums/user-role.enum';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'admin',
          email: 'admin@gmail.com',
          password: await hashPassword('123'),
          roles: [Role.ADMIN, Role.USER],
          permissions: [],
        },
      ])
      .execute();
  }
}
