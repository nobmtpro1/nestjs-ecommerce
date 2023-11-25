import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700886857315 implements MigrationInterface {
    name = 'Migration1700886857315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roles\` \`roles\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`permissions\` \`permissions\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`permissions\` \`permissions\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roles\` \`roles\` text NOT NULL`);
    }

}
