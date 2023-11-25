import { Exclude, Expose } from 'class-transformer';
import { AuditEntity } from './audit.entity';
import { Permission } from '../modules/authorization/enums/permission.enum';
import { Role } from '../modules/authorization/enums/role.enum';
import {
  Entity,
  Column,
  Unique,
  OneToMany,
  JoinColumn,
  OneToOne,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { UserAddress } from './user-address.entity';
import { UserToken } from './user-token.entity';

@Entity({ name: 'user' })
export class User extends AuditEntity {
  @Column('varchar', { name: 'name', length: 255, nullable: true })
  name: string;

  @Column('varchar', { name: 'email', length: 255, unique: true })
  email: string;

  @Column('varchar', {
    name: 'phone',
    length: 255,
    unique: true,
    nullable: true,
  })
  phone: string;

  @Column('boolean', { name: 'verified_email', default: false })
  verifiedEmail: boolean;

  @Column({ name: 'password', nullable: true })
  @Exclude()
  password: string;

  @Column('simple-array', { name: 'roles', nullable: true })
  roles: Role[];

  @Column('simple-array', { name: 'permissions', nullable: true })
  permissions: Permission[];

  @OneToMany(() => UserAddress, (address) => address.user, {
    eager: true,
  })
  addresses: UserAddress[];

  @OneToOne(() => UserToken, (token) => token.user, { lazy: true })
  token: UserToken;

  @Column('varchar', { name: 'avatar', length: 255, nullable: true })
  avatar: string;

  @BeforeUpdate()
  @BeforeInsert()
  public createAvatar() {
    if (!this.avatar) {
      this.avatar = `https://ui-avatars.com/api/?name=${this.name}&background=random`;
    }
  }
}
