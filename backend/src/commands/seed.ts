import { Command, CommandRunner } from 'nest-commander';
import { hashPassword } from 'src/commons/helpers';
import { Role } from 'src/enums/user-role.enum';
import { DataSource } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Command({ name: 'seed', description: 'A parameter parse' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async run(): Promise<void> {
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
            password: await hashPassword('123'),
            roles: [Role.ADMIN, Role.USER],
            permissions: [],
          },
        ])
        .execute();
    }
  }
}
