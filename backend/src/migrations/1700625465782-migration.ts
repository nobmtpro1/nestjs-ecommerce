import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700625465782 implements MigrationInterface {
    name = 'Migration1700625465782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP FOREIGN KEY \`FK_523130dc3fdbb867290040ca528\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_ca67dd080aac5ecf99609960cd2\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_e634fca34f6b594b87fdbee95f6\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_2e5f7289b142837b71b4aa17dc4\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` CHANGE \`province_code\` \`province_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`address_ward\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ward_code\` varchar(255) NOT NULL, \`ward_name\` varchar(255) NOT NULL, \`district_id\` bigint NOT NULL, UNIQUE INDEX \`IDX_3e328bdab7dd5174eca111ac09\` (\`ward_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`default\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP COLUMN \`province_id\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD \`province_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address_ward\` ADD CONSTRAINT \`FK_7387bd1e32e4a667389d906c8b7\` FOREIGN KEY (\`district_id\`) REFERENCES \`address_district\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD CONSTRAINT \`FK_6f75f3a726085d7df1003198509\` FOREIGN KEY (\`province_id\`) REFERENCES \`address_province\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_ca67dd080aac5ecf99609960cd2\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_e634fca34f6b594b87fdbee95f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_2e5f7289b142837b71b4aa17dc4\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_1737ede6d075a0efb04b33d4f92\` FOREIGN KEY (\`district_code\`) REFERENCES \`address_district\`(\`district_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_fd8cc793b365abd9278e0ac5d15\` FOREIGN KEY (\`ward_code\`) REFERENCES \`address_ward\`(\`ward_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_fd8cc793b365abd9278e0ac5d15\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_1737ede6d075a0efb04b33d4f92\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_2e5f7289b142837b71b4aa17dc4\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_e634fca34f6b594b87fdbee95f6\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_ca67dd080aac5ecf99609960cd2\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP FOREIGN KEY \`FK_6f75f3a726085d7df1003198509\``);
        await queryRunner.query(`ALTER TABLE \`address_ward\` DROP FOREIGN KEY \`FK_7387bd1e32e4a667389d906c8b7\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP COLUMN \`province_id\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD \`province_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`default\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`phone\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e328bdab7dd5174eca111ac09\` ON \`address_ward\``);
        await queryRunner.query(`DROP TABLE \`address_ward\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` CHANGE \`province_id\` \`province_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_2e5f7289b142837b71b4aa17dc4\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_e634fca34f6b594b87fdbee95f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_ca67dd080aac5ecf99609960cd2\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD CONSTRAINT \`FK_523130dc3fdbb867290040ca528\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
