import { Exclude, Expose } from 'class-transformer';
import { AuditEntity } from 'src/entities/audit.entity';
import { Permission } from 'src/modules/authorization/permission.enum';
import { Role } from 'src/modules/authorization/role.enum';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends AuditEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Expose()
  get fullInfo(): string {
    return `${this.name} ${this.email}`;
  }

  @Column('simple-array', { nullable: false })
  roles: Role[];

  @Column('simple-array', { nullable: false })
  permissions: Permission[];
}
