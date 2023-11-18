import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700279357744 implements MigrationInterface {
    name = 'Migration1700279357744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`compare_at_price\` \`compare_at_price\` bigint NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`compare_at_price\` \`compare_at_price\` bigint NOT NULL DEFAULT '0'`);
    }

}
