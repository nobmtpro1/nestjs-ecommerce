import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700896916759 implements MigrationInterface {
    name = 'Migration1700896916759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NULL, \`description\` varchar(255) NULL, \`value\` float NOT NULL DEFAULT '0', \`value_type\` varchar(255) NOT NULL DEFAULT 'fixed', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`checkout_cart_item\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quantity\` int NOT NULL DEFAULT '0', \`checkout_cart_id\` bigint NULL, \`product_id\` bigint NULL, \`product_variant_id\` bigint NULL, \`discount_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`checkout_cart\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`note\` varchar(255) NULL, \`email\` varchar(255) NULL, \`invoice_sent_at\` timestamp NULL, \`invoice_url\` varchar(255) NULL, \`completed_at\` timestamp NULL, \`shipping_price\` bigint NOT NULL DEFAULT '0', \`subtotal\` bigint NOT NULL DEFAULT '0', \`total\` bigint NOT NULL DEFAULT '0', \`tags\` text NULL, \`user_id\` bigint NULL, \`shipping_address_id\` bigint NULL, \`discount_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` ADD CONSTRAINT \`FK_668f6e6288539ca8f1a045d2d70\` FOREIGN KEY (\`checkout_cart_id\`) REFERENCES \`checkout_cart\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` ADD CONSTRAINT \`FK_710e6b9da9d891eed2af2a23fcf\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` ADD CONSTRAINT \`FK_b76f1604ae57354ed1ccb81b485\` FOREIGN KEY (\`product_variant_id\`) REFERENCES \`product_variant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` ADD CONSTRAINT \`FK_58f7cc00efd54fbe8d279b62dd4\` FOREIGN KEY (\`discount_id\`) REFERENCES \`discount\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` ADD CONSTRAINT \`FK_8c60effe7e0094989ee0c0fd96f\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` ADD CONSTRAINT \`FK_8a2dbf11be5e2ea7290e0e951ae\` FOREIGN KEY (\`shipping_address_id\`) REFERENCES \`user_address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` ADD CONSTRAINT \`FK_d8cf0aa535ecb555aceb2f089cc\` FOREIGN KEY (\`discount_id\`) REFERENCES \`discount\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` DROP FOREIGN KEY \`FK_d8cf0aa535ecb555aceb2f089cc\``);
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` DROP FOREIGN KEY \`FK_8a2dbf11be5e2ea7290e0e951ae\``);
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` DROP FOREIGN KEY \`FK_8c60effe7e0094989ee0c0fd96f\``);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` DROP FOREIGN KEY \`FK_58f7cc00efd54fbe8d279b62dd4\``);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` DROP FOREIGN KEY \`FK_b76f1604ae57354ed1ccb81b485\``);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` DROP FOREIGN KEY \`FK_710e6b9da9d891eed2af2a23fcf\``);
        await queryRunner.query(`ALTER TABLE \`checkout_cart_item\` DROP FOREIGN KEY \`FK_668f6e6288539ca8f1a045d2d70\``);
        await queryRunner.query(`DROP TABLE \`checkout_cart\``);
        await queryRunner.query(`DROP TABLE \`checkout_cart_item\``);
        await queryRunner.query(`DROP TABLE \`discount\``);
    }

}
