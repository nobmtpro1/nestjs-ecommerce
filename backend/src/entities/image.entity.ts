import { AuditEntity } from './audit.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'image' })
export class Image extends AuditEntity {
  @Column('longtext', { name: 'src' })
  src: string;
}
