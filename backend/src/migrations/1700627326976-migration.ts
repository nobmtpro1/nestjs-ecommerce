import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700627326976 implements MigrationInterface {
  name = 'Migration1700627326976';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`address_ward\`;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`address_ward\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ward_code\` varchar(255) NOT NULL, \`ward_name\` varchar(255) NOT NULL, \`district_id\` bigint NOT NULL, UNIQUE INDEX \`IDX_3e328bdab7dd5174eca111ac09\` (\`ward_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }
}
