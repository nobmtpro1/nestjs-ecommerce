import { Exclude, Expose } from 'class-transformer';
import { AuditEntity } from './audit.entity';
import { Permission } from '../modules/authorization/enums/permission.enum';
import { Role } from '../modules/authorization/enums/role.enum';
import { Entity, Column, Unique } from 'typeorm';

@Entity({ name: 'user' })
export class User extends AuditEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'email', length: 255, unique: true })
  email: string;

  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @Expose()
  get fullInfo(): string {
    return `${this.name} ${this.email}`;
  }

  @Column('simple-array', { name: 'roles', nullable: false })
  roles: Role[];

  @Column('simple-array', { name: 'permissions', nullable: false })
  permissions: Permission[];
}
