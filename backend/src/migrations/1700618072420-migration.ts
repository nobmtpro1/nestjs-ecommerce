import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700618072420 implements MigrationInterface {
    name = 'Migration1700618072420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS=0;`);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP FOREIGN KEY \`FK_523130dc3fdbb867290040ca528\``);
        
        await queryRunner.query(`DROP INDEX \`IDX_a02a759eb226a83f6cc87ebdb8\` ON \`address_province\``);
        await queryRunner.query(`ALTER TABLE \`address_province\` DROP COLUMN \`province_id\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP COLUMN \`district_id\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`district_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`ward_code\` varchar(255) NOT NULL`);

        await queryRunner.query(`ALTER TABLE \`address_district\` CHANGE \`province_code\` \`province_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD CONSTRAINT \`FK_523130dc3fdbb867290040ca528\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address_ward\` ADD CONSTRAINT \`FK_3be09079d5d7c73378efe5123a4\` FOREIGN KEY (\`district_code\`) REFERENCES \`address_district\`(\`district_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_ca67dd080aac5ecf99609960cd2\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_e634fca34f6b594b87fdbee95f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_2e5f7289b142837b71b4aa17dc4\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_1737ede6d075a0efb04b33d4f92\` FOREIGN KEY (\`district_code\`) REFERENCES \`address_district\`(\`district_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_fd8cc793b365abd9278e0ac5d15\` FOREIGN KEY (\`ward_code\`) REFERENCES \`address_ward\`(\`ward_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`SET FOREIGN_KEY_CHECKS=1;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_fd8cc793b365abd9278e0ac5d15\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_1737ede6d075a0efb04b33d4f92\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_2e5f7289b142837b71b4aa17dc4\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_e634fca34f6b594b87fdbee95f6\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_ca67dd080aac5ecf99609960cd2\``);
        await queryRunner.query(`ALTER TABLE \`address_ward\` DROP FOREIGN KEY \`FK_3be09079d5d7c73378efe5123a4\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` DROP FOREIGN KEY \`FK_523130dc3fdbb867290040ca528\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` CHANGE \`province_code\` \`province_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD CONSTRAINT \`FK_523130dc3fdbb867290040ca528\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`ward_code\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`district_code\``);
        await queryRunner.query(`ALTER TABLE \`address_district\` ADD \`district_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`address_province\` ADD \`province_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a02a759eb226a83f6cc87ebdb8\` ON \`address_province\` (\`province_id\`)`);
    }

}
