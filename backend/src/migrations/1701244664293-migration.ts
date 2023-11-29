import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701244664293 implements MigrationInterface {
    name = 'Migration1701244664293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`checkout_order\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cancel_reason\` varchar(255) NULL, \`canceled_at\` timestamp NULL, \`cart_id\` bigint NULL, \`closed_at\` timestamp NULL, \`confirmed\` int NOT NULL DEFAULT 0, \`email\` varchar(255) NULL, \`subtotal\` bigint NOT NULL DEFAULT '0', \`shipping_price\` bigint NOT NULL DEFAULT '0', \`discount_price\` bigint NOT NULL DEFAULT '0', \`total\` bigint NOT NULL DEFAULT '0', \`financial_status\` varchar(255) NOT NULL DEFAULT 'pending', \`fulfillment_status\` varchar(255) NOT NULL DEFAULT 'null', \`note\` varchar(255) NULL, \`order_status_url\` varchar(255) NULL, \`total_weight\` int NOT NULL DEFAULT '0', \`shippingAddress\` text NULL, \`appliedDiscount\` text NULL, \`payment\` varchar(255) NULL, \`items\` text NULL, \`tags\` text NULL, \`user_id\` bigint NULL, UNIQUE INDEX \`REL_bd0b33e81dae1aed3acc7fce3d\` (\`cart_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` ADD \`discount_price\` bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`checkout_order\` ADD CONSTRAINT \`FK_bd0b33e81dae1aed3acc7fce3d9\` FOREIGN KEY (\`cart_id\`) REFERENCES \`checkout_cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`checkout_order\` ADD CONSTRAINT \`FK_2ba77586e17f9d2cb6ab678256b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checkout_order\` DROP FOREIGN KEY \`FK_2ba77586e17f9d2cb6ab678256b\``);
        await queryRunner.query(`ALTER TABLE \`checkout_order\` DROP FOREIGN KEY \`FK_bd0b33e81dae1aed3acc7fce3d9\``);
        await queryRunner.query(`ALTER TABLE \`checkout_cart\` DROP COLUMN \`discount_price\``);
        await queryRunner.query(`DROP INDEX \`REL_bd0b33e81dae1aed3acc7fce3d\` ON \`checkout_order\``);
        await queryRunner.query(`DROP TABLE \`checkout_order\``);
    }

}
