import { AuditEntity } from 'src/entities/audit.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Image extends AuditEntity {
  @Column('longtext')
  src: string;
}
