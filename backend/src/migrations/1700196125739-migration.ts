import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700196125739 implements MigrationInterface {
    name = 'Migration1700196125739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`short_description\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`type\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`type\` varchar(255) NOT NULL DEFAULT 'VARIABLE'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`short_description\` varchar(1000) NOT NULL`);
    }

}
