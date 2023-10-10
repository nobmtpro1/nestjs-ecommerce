import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductAttribute1696906625884 implements MigrationInterface {
    name = 'ProductAttribute1696906625884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` DROP FOREIGN KEY \`FK_fd9ec8fbc06e684b47369ba3645\``);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceFrom\` \`salePriceFrom\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceTo\` \`salePriceTo\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`sku\` \`sku\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`stock\` \`stock\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_ff7b9c5d9302d5313d43d799d33\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_c711bba5afd50a326a70865bfa3\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`productAttributeId\` \`productAttributeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute\` ADD UNIQUE INDEX \`IDX_05d080e931ec850c1e0219ee11\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` ADD CONSTRAINT \`FK_fd9ec8fbc06e684b47369ba3645\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_ff7b9c5d9302d5313d43d799d33\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_c711bba5afd50a326a70865bfa3\` FOREIGN KEY (\`productAttributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_c711bba5afd50a326a70865bfa3\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_ff7b9c5d9302d5313d43d799d33\``);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` DROP FOREIGN KEY \`FK_fd9ec8fbc06e684b47369ba3645\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute\` DROP INDEX \`IDX_05d080e931ec850c1e0219ee11\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`productAttributeId\` \`productAttributeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_c711bba5afd50a326a70865bfa3\` FOREIGN KEY (\`productAttributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_ff7b9c5d9302d5313d43d799d33\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`productId\` \`productId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`stock\` \`stock\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`sku\` \`sku\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceTo\` \`salePriceTo\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceFrom\` \`salePriceFrom\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` ADD CONSTRAINT \`FK_fd9ec8fbc06e684b47369ba3645\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
