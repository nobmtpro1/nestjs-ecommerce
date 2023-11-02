import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1698892563787 implements MigrationInterface {
    name = 'Migration1698892563787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_variation\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sku\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`downloadable\` tinyint NOT NULL DEFAULT 0, \`isVirtual\` tinyint NOT NULL DEFAULT 0, \`isManageStock\` tinyint NOT NULL DEFAULT 0, \`regularPrice\` bigint NOT NULL DEFAULT '0', \`salePrice\` bigint NOT NULL DEFAULT '0', \`salePriceFrom\` date NULL, \`salePriceTo\` date NULL, \`soldIndividually\` tinyint NOT NULL DEFAULT 0, \`stock\` int NULL, \`stockStatus\` int NOT NULL DEFAULT '1', \`weight\` float NULL, \`length\` float NULL, \`width\` float NULL, \`height\` float NULL, \`productId\` varchar(36) NULL, \`imageId\` varchar(36) NULL, \`productAttributeValue1Id\` varchar(36) NULL, \`productAttributeValue2Id\` varchar(36) NULL, \`productAttributeValue3Id\` varchar(36) NULL, UNIQUE INDEX \`REL_e406b1dcd62e293cf311347164\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` DROP FOREIGN KEY \`FK_fd9ec8fbc06e684b47369ba3645\``);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceFrom\` \`salePriceFrom\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceTo\` \`salePriceTo\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`sku\` \`sku\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`stock\` \`stock\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`weight\` \`weight\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`length\` \`length\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`width\` \`width\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`height\` \`height\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_ff7b9c5d9302d5313d43d799d33\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_c711bba5afd50a326a70865bfa3\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`productAttributeId\` \`productAttributeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` ADD CONSTRAINT \`FK_fd9ec8fbc06e684b47369ba3645\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_ff7b9c5d9302d5313d43d799d33\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_c711bba5afd50a326a70865bfa3\` FOREIGN KEY (\`productAttributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_9eb6ebb27c4efb410d7a89670b5\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_e406b1dcd62e293cf3113471642\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_ca9621c237c371f80514bc2f77b\` FOREIGN KEY (\`productAttributeValue1Id\`) REFERENCES \`product_attribute_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_b96615197baaa18bb5cf4d15b03\` FOREIGN KEY (\`productAttributeValue2Id\`) REFERENCES \`product_attribute_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_2bf3cfe8a26d6453ab9932ce0f7\` FOREIGN KEY (\`productAttributeValue3Id\`) REFERENCES \`product_attribute_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_2bf3cfe8a26d6453ab9932ce0f7\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_b96615197baaa18bb5cf4d15b03\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_ca9621c237c371f80514bc2f77b\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_e406b1dcd62e293cf3113471642\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_9eb6ebb27c4efb410d7a89670b5\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_c711bba5afd50a326a70865bfa3\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_ff7b9c5d9302d5313d43d799d33\``);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` DROP FOREIGN KEY \`FK_fd9ec8fbc06e684b47369ba3645\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`productAttributeId\` \`productAttributeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_c711bba5afd50a326a70865bfa3\` FOREIGN KEY (\`productAttributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_ff7b9c5d9302d5313d43d799d33\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`productId\` \`productId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`height\` \`height\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`width\` \`width\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`length\` \`length\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`weight\` \`weight\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`stock\` \`stock\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`sku\` \`sku\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceTo\` \`salePriceTo\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` CHANGE \`salePriceFrom\` \`salePriceFrom\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` ADD CONSTRAINT \`FK_fd9ec8fbc06e684b47369ba3645\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`REL_e406b1dcd62e293cf311347164\` ON \`product_variation\``);
        await queryRunner.query(`DROP TABLE \`product_variation\``);
    }

}
