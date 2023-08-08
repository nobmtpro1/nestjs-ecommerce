import {
  Column,
  BeforeUpdate,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate } from 'class-validator';

export abstract class AuditEntity {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @IsDate()
  public updatedAt: Date;

  @Column({ nullable: true })
  @IsDate()
  public createdAt: Date;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = new Date();
  }
  @BeforeInsert()
  public setCreatedAtAt() {
    this.createdAt = new Date();
  }
}
