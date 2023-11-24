import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700798035304 implements MigrationInterface {
    name = 'Migration1700798035304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_79ac751931054ef450a2ee47778\``);
        await queryRunner.query(`DROP INDEX \`REL_79ac751931054ef450a2ee4777\` ON \`user_token\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`token_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_48cb6b5c20faa63157b3c1baf7\` (\`token_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_48cb6b5c20faa63157b3c1baf7\` ON \`user\` (\`token_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_48cb6b5c20faa63157b3c1baf7f\` FOREIGN KEY (\`token_id\`) REFERENCES \`user_token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_48cb6b5c20faa63157b3c1baf7f\``);
        await queryRunner.query(`DROP INDEX \`REL_48cb6b5c20faa63157b3c1baf7\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_48cb6b5c20faa63157b3c1baf7\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`token_id\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD \`user_id\` bigint NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_79ac751931054ef450a2ee4777\` ON \`user_token\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_79ac751931054ef450a2ee47778\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
