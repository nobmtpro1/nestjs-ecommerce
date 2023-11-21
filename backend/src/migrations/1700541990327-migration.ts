import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700541990327 implements MigrationInterface {
    name = 'Migration1700541990327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address_province\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`province_code\` varchar(255) NOT NULL, \`province_name\` varchar(255) NOT NULL, \`province_id\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2f2c6b64461f025a07b8b73f00\` (\`province_code\`), UNIQUE INDEX \`IDX_a02a759eb226a83f6cc87ebdb8\` (\`province_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_address\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`province_code\` varchar(255) NOT NULL, \`user_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verified_email\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_29d6df815a78e4c8291d3cf5e53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_2e5f7289b142837b71b4aa17dc4\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_2e5f7289b142837b71b4aa17dc4\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_29d6df815a78e4c8291d3cf5e53\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verified_email\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_8e1f623798118e629b46a9e629\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
        await queryRunner.query(`DROP TABLE \`user_address\``);
        await queryRunner.query(`DROP INDEX \`IDX_a02a759eb226a83f6cc87ebdb8\` ON \`address_province\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f2c6b64461f025a07b8b73f00\` ON \`address_province\``);
        await queryRunner.query(`DROP TABLE \`address_province\``);
    }

}
