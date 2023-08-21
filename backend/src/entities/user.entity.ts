import { AuditEntity } from 'src/entities/audit.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends AuditEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column()
  password: string;
}
