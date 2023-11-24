import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700796119821 implements MigrationInterface {
    name = 'Migration1700796119821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_token\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`access_token\` text NOT NULL, \`refresh_token\` text NOT NULL, \`user_id\` bigint NULL, UNIQUE INDEX \`REL_79ac751931054ef450a2ee4777\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_79ac751931054ef450a2ee47778\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_79ac751931054ef450a2ee47778\``);
        await queryRunner.query(`DROP INDEX \`REL_79ac751931054ef450a2ee4777\` ON \`user_token\``);
        await queryRunner.query(`DROP TABLE \`user_token\``);
    }

}
