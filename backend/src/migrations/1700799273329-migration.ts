import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700799273329 implements MigrationInterface {
    name = 'Migration1700799273329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_79ac751931054ef450a2ee47778\``);
        await queryRunner.query(`DROP INDEX \`REL_79ac751931054ef450a2ee4777\` ON \`user_token\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`user_token_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_14ecd7104647351e57a0c1d978\` (\`user_token_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_14ecd7104647351e57a0c1d978\` ON \`user\` (\`user_token_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_14ecd7104647351e57a0c1d9786\` FOREIGN KEY (\`user_token_id\`) REFERENCES \`user_token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_14ecd7104647351e57a0c1d9786\``);
        await queryRunner.query(`DROP INDEX \`REL_14ecd7104647351e57a0c1d978\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_14ecd7104647351e57a0c1d978\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`user_token_id\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD \`user_id\` bigint NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_79ac751931054ef450a2ee4777\` ON \`user_token\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_79ac751931054ef450a2ee47778\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
