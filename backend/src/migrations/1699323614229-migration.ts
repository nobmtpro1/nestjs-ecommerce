import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699323614229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET foreign_key_checks = 0;`);
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_attribute\``);
    await queryRunner.query(
      `DROP TABLE IF EXISTS \`product_attributes_product_attribute\``,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_attribute_value\``);
    await queryRunner.query(
      `DROP TABLE IF EXISTS \`product_attribute_values_product_attribute_value\``,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_simple_data\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_variation\``);
    await queryRunner.query(`SET foreign_key_checks = 1;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET foreign_key_checks = 0;`);
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_attribute\``);
    await queryRunner.query(
      `DROP TABLE IF EXISTS \`product_attributes_product_attribute\``,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_attribute_value\``);
    await queryRunner.query(
      `DROP TABLE IF EXISTS \`product_attribute_values_product_attribute_value\``,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_simple_data\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`product_variation\``);
    await queryRunner.query(`SET foreign_key_checks = 1;`);
  }
}
