import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701224661132 implements MigrationInterface {
    name = 'Migration1701224661132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_29d6df815a78e4c8291d3cf5e5\` ON \`user_address\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`default\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`default\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_29d6df815a78e4c8291d3cf5e5\` ON \`user_address\` (\`user_id\`)`);
    }

}
