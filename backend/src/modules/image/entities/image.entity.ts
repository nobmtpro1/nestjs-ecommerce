import { AuditEntity } from '../../common/entities/audit.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'image' })
export class Image extends AuditEntity {
  @Column('longtext', { name: 'src' })
  src: string;
}
