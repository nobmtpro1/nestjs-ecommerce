import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699068906695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_variation\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_variation\``);
  }
}
