import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700210478196 implements MigrationInterface {
    name = 'Migration1700210478196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_variant\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NULL, \`price\` bigint NOT NULL DEFAULT '0', \`sku\` varchar(255) NULL, \`compare_at_price\` bigint NOT NULL DEFAULT '0', \`option1\` varchar(255) NULL, \`option2\` varchar(255) NULL, \`option3\` varchar(255) NULL, \`weight\` float NULL, \`inventory_quantity\` int NULL, \`require_shipping\` tinyint NOT NULL DEFAULT 0, \`is_manage_stock\` tinyint NOT NULL DEFAULT 0, \`is_continue_selling_when_out_of_stock\` tinyint NOT NULL DEFAULT 0, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`product_id\` varchar(36) NULL, \`image_id\` varchar(36) NULL, UNIQUE INDEX \`REL_e768b1a1fe30fe0aa9cc54b1a8\` (\`image_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`body_html\` longtext NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'active', \`handle\` varchar(1000) NOT NULL, \`image_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_db7355f7bd36c547c8a4f539e5\` (\`handle\`), UNIQUE INDEX \`REL_99d98a80f57857d51b5f63c824\` (\`image_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_option\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`position\` int NOT NULL, \`values\` text NOT NULL, \`product_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`roles\` text NOT NULL, \`permissions\` text NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_m2m_image\` (\`productId\` varchar(36) NOT NULL, \`imageId\` varchar(36) NOT NULL, INDEX \`IDX_fa6b2b3cb16ac92ef7a09aef0b\` (\`productId\`), INDEX \`IDX_d1d6456ee2bf73f4f90d60422f\` (\`imageId\`), PRIMARY KEY (\`productId\`, \`imageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_m2m_product_category\` (\`productId\` varchar(36) NOT NULL, \`productCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_6c1a7d4f25e3dd540c8fc0181b\` (\`productId\`), INDEX \`IDX_2be1094a40714e6764b9a9535e\` (\`productCategoryId\`), PRIMARY KEY (\`productId\`, \`productCategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_m2m_product_tag\` (\`productId\` varchar(36) NOT NULL, \`productTagId\` varchar(36) NOT NULL, INDEX \`IDX_5c50cb9901347050fe7e7e4922\` (\`productId\`), INDEX \`IDX_ef8060ecdd52b3cc9cda336825\` (\`productTagId\`), PRIMARY KEY (\`productId\`, \`productTagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_5b2718e9fc40766e31de1d53870\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_ca67dd080aac5ecf99609960cd2\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_e768b1a1fe30fe0aa9cc54b1a83\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_99d98a80f57857d51b5f63c8240\` FOREIGN KEY (\`image_id\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_e634fca34f6b594b87fdbee95f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_m2m_image\` ADD CONSTRAINT \`FK_fa6b2b3cb16ac92ef7a09aef0bd\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_m2m_image\` ADD CONSTRAINT \`FK_d1d6456ee2bf73f4f90d60422f1\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_category\` ADD CONSTRAINT \`FK_6c1a7d4f25e3dd540c8fc0181b4\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_category\` ADD CONSTRAINT \`FK_2be1094a40714e6764b9a9535e5\` FOREIGN KEY (\`productCategoryId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_tag\` ADD CONSTRAINT \`FK_5c50cb9901347050fe7e7e4922b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_tag\` ADD CONSTRAINT \`FK_ef8060ecdd52b3cc9cda3368251\` FOREIGN KEY (\`productTagId\`) REFERENCES \`product_tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_tag\` DROP FOREIGN KEY \`FK_ef8060ecdd52b3cc9cda3368251\``);
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_tag\` DROP FOREIGN KEY \`FK_5c50cb9901347050fe7e7e4922b\``);
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_category\` DROP FOREIGN KEY \`FK_2be1094a40714e6764b9a9535e5\``);
        await queryRunner.query(`ALTER TABLE \`product_m2m_product_category\` DROP FOREIGN KEY \`FK_6c1a7d4f25e3dd540c8fc0181b4\``);
        await queryRunner.query(`ALTER TABLE \`product_m2m_image\` DROP FOREIGN KEY \`FK_d1d6456ee2bf73f4f90d60422f1\``);
        await queryRunner.query(`ALTER TABLE \`product_m2m_image\` DROP FOREIGN KEY \`FK_fa6b2b3cb16ac92ef7a09aef0bd\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_e634fca34f6b594b87fdbee95f6\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_99d98a80f57857d51b5f63c8240\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_e768b1a1fe30fe0aa9cc54b1a83\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_ca67dd080aac5ecf99609960cd2\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_5b2718e9fc40766e31de1d53870\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef8060ecdd52b3cc9cda336825\` ON \`product_m2m_product_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_5c50cb9901347050fe7e7e4922\` ON \`product_m2m_product_tag\``);
        await queryRunner.query(`DROP TABLE \`product_m2m_product_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_2be1094a40714e6764b9a9535e\` ON \`product_m2m_product_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_6c1a7d4f25e3dd540c8fc0181b\` ON \`product_m2m_product_category\``);
        await queryRunner.query(`DROP TABLE \`product_m2m_product_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_d1d6456ee2bf73f4f90d60422f\` ON \`product_m2m_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa6b2b3cb16ac92ef7a09aef0b\` ON \`product_m2m_image\``);
        await queryRunner.query(`DROP TABLE \`product_m2m_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`product_option\``);
        await queryRunner.query(`DROP INDEX \`REL_99d98a80f57857d51b5f63c824\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_db7355f7bd36c547c8a4f539e5\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`REL_e768b1a1fe30fe0aa9cc54b1a8\` ON \`product_variant\``);
        await queryRunner.query(`DROP TABLE \`product_variant\``);
    }

}
