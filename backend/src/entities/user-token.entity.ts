import { AuditEntity } from './audit.entity';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_token' })
export class UserToken extends AuditEntity {
  @OneToOne(() => User, (user) => user.token, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text', { name: 'access_token' })
  accessToken: string;

  @Column('text', { name: 'refresh_token' })
  refreshToken: string;
}
