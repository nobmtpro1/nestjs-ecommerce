import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700542857909 implements MigrationInterface {
    name = 'Migration1700542857909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP COLUMN \`district_type\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP COLUMN \`district_support_type\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP COLUMN \`province_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD \`province_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD \`district_support_type\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD \`district_type\` int NOT NULL`);
    }

}
