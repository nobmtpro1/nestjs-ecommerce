import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700542730221 implements MigrationInterface {
    name = 'Migration1700542730221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_29d6df815a78e4c8291d3cf5e53\``);
        await queryRunner.query(`CREATE TABLE \`address_district\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`district_id\` varchar(255) NOT NULL, \`district_name\` varchar(255) NOT NULL, \`district_code\` varchar(255) NOT NULL, \`district_type\` int NOT NULL, \`district_support_type\` int NOT NULL, \`province_id\` varchar(255) NOT NULL, \`province_code\` varchar(255) NULL, UNIQUE INDEX \`IDX_fe9e6006bb795a786a59a859a3\` (\`district_id\`), UNIQUE INDEX \`IDX_9a8f8ecc4c69106fb8e25ca915\` (\`district_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD CONSTRAINT \`FK_523130dc3fdbb867290040ca528\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_29d6df815a78e4c8291d3cf5e53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_29d6df815a78e4c8291d3cf5e53\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP FOREIGN KEY \`FK_523130dc3fdbb867290040ca528\``);
        await queryRunner.query(`DROP INDEX \`IDX_9a8f8ecc4c69106fb8e25ca915\` ON \`address_district\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe9e6006bb795a786a59a859a3\` ON \`address_district\``);
        await queryRunner.query(`DROP TABLE \`address_district\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_29d6df815a78e4c8291d3cf5e53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
