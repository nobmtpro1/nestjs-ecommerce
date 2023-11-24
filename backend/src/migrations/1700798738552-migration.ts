import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700798738552 implements MigrationInterface {
    name = 'Migration1700798738552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_48cb6b5c20faa63157b3c1baf7\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD \`user_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD UNIQUE INDEX \`IDX_79ac751931054ef450a2ee4777\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_79ac751931054ef450a2ee4777\` ON \`user_token\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_79ac751931054ef450a2ee47778\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_79ac751931054ef450a2ee47778\``);
        await queryRunner.query(`DROP INDEX \`REL_79ac751931054ef450a2ee4777\` ON \`user_token\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP INDEX \`IDX_79ac751931054ef450a2ee4777\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_48cb6b5c20faa63157b3c1baf7\` ON \`user\` (\`token_id\`)`);
    }

}
