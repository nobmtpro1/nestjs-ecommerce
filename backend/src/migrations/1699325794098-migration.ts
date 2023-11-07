import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699325794098 implements MigrationInterface {
    name = 'Migration1699325794098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_attribute\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_05d080e931ec850c1e0219ee11\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_attribute_value\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`imageId\` varchar(36) NULL, \`productAttributeId\` varchar(36) NULL, UNIQUE INDEX \`REL_ff7b9c5d9302d5313d43d799d3\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_simple_data\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`regularPrice\` bigint NOT NULL DEFAULT '0', \`salePrice\` bigint NOT NULL DEFAULT '0', \`salePriceFrom\` date NULL, \`salePriceTo\` date NULL, \`sku\` varchar(255) NULL, \`stock\` int NULL, \`stockStatus\` int NOT NULL DEFAULT '1', \`soldIndividually\` tinyint NOT NULL DEFAULT 0, \`weight\` float NULL, \`length\` float NULL, \`width\` float NULL, \`height\` float NULL, \`productId\` varchar(36) NULL, UNIQUE INDEX \`IDX_fd9ec8fbc06e684b47369ba364\` (\`productId\`), UNIQUE INDEX \`REL_fd9ec8fbc06e684b47369ba364\` (\`productId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_variation\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sku\` varchar(255) NULL, \`status\` int NOT NULL DEFAULT '1', \`downloadable\` tinyint NOT NULL DEFAULT 0, \`isVirtual\` tinyint NOT NULL DEFAULT 0, \`isManageStock\` tinyint NOT NULL DEFAULT 0, \`regularPrice\` bigint NOT NULL DEFAULT '0', \`salePrice\` bigint NOT NULL DEFAULT '0', \`salePriceFrom\` date NULL, \`salePriceTo\` date NULL, \`soldIndividually\` tinyint NOT NULL DEFAULT 0, \`stock\` int NULL, \`stockStatus\` int NOT NULL DEFAULT '1', \`weight\` float NULL, \`length\` float NULL, \`width\` float NULL, \`height\` float NULL, \`productId\` varchar(36) NULL, \`imageId\` varchar(36) NULL, \`productAttributeValue1Id\` varchar(36) NULL, \`productAttributeValue2Id\` varchar(36) NULL, \`productAttributeValue3Id\` varchar(36) NULL, UNIQUE INDEX \`REL_e406b1dcd62e293cf311347164\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_6e420052844edf3a5506d863ce6\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_b83f23626741630a86299607156\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`sku\` \`sku\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`salePriceFrom\` \`salePriceFrom\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`salePriceTo\` \`salePriceTo\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`stock\` \`stock\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`weight\` \`weight\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`length\` \`length\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`width\` \`width\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`height\` \`height\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`option1\` \`option1\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`option2\` \`option2\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`option3\` \`option3\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_2ca1aab0a82e9c0058d8465ad02\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_6e420052844edf3a5506d863ce6\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_b83f23626741630a86299607156\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_2ca1aab0a82e9c0058d8465ad02\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_ff7b9c5d9302d5313d43d799d33\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` ADD CONSTRAINT \`FK_c711bba5afd50a326a70865bfa3\` FOREIGN KEY (\`productAttributeId\`) REFERENCES \`product_attribute\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` ADD CONSTRAINT \`FK_fd9ec8fbc06e684b47369ba3645\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_9eb6ebb27c4efb410d7a89670b5\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_e406b1dcd62e293cf3113471642\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_ca9621c237c371f80514bc2f77b\` FOREIGN KEY (\`productAttributeValue1Id\`) REFERENCES \`product_attribute_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_b96615197baaa18bb5cf4d15b03\` FOREIGN KEY (\`productAttributeValue2Id\`) REFERENCES \`product_attribute_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variation\` ADD CONSTRAINT \`FK_2bf3cfe8a26d6453ab9932ce0f7\` FOREIGN KEY (\`productAttributeValue3Id\`) REFERENCES \`product_attribute_value\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_2bf3cfe8a26d6453ab9932ce0f7\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_b96615197baaa18bb5cf4d15b03\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_ca9621c237c371f80514bc2f77b\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_e406b1dcd62e293cf3113471642\``);
        await queryRunner.query(`ALTER TABLE \`product_variation\` DROP FOREIGN KEY \`FK_9eb6ebb27c4efb410d7a89670b5\``);
        await queryRunner.query(`ALTER TABLE \`product_simple_data\` DROP FOREIGN KEY \`FK_fd9ec8fbc06e684b47369ba3645\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_c711bba5afd50a326a70865bfa3\``);
        await queryRunner.query(`ALTER TABLE \`product_attribute_value\` DROP FOREIGN KEY \`FK_ff7b9c5d9302d5313d43d799d33\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product_option\` DROP FOREIGN KEY \`FK_2ca1aab0a82e9c0058d8465ad02\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_b83f23626741630a86299607156\``);
        await queryRunner.query(`ALTER TABLE \`product_variant\` DROP FOREIGN KEY \`FK_6e420052844edf3a5506d863ce6\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_option\` CHANGE \`productId\` \`productId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_option\` ADD CONSTRAINT \`FK_2ca1aab0a82e9c0058d8465ad02\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`productId\` \`productId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`option3\` \`option3\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`option2\` \`option2\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`option1\` \`option1\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`height\` \`height\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`width\` \`width\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`length\` \`length\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`weight\` \`weight\` float(12) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`stock\` \`stock\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`salePriceTo\` \`salePriceTo\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`salePriceFrom\` \`salePriceFrom\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` CHANGE \`sku\` \`sku\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_b83f23626741630a86299607156\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variant\` ADD CONSTRAINT \`FK_6e420052844edf3a5506d863ce6\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`REL_e406b1dcd62e293cf311347164\` ON \`product_variation\``);
        await queryRunner.query(`DROP TABLE \`product_variation\``);
        await queryRunner.query(`DROP INDEX \`REL_fd9ec8fbc06e684b47369ba364\` ON \`product_simple_data\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd9ec8fbc06e684b47369ba364\` ON \`product_simple_data\``);
        await queryRunner.query(`DROP TABLE \`product_simple_data\``);
        await queryRunner.query(`DROP INDEX \`REL_ff7b9c5d9302d5313d43d799d3\` ON \`product_attribute_value\``);
        await queryRunner.query(`DROP TABLE \`product_attribute_value\``);
        await queryRunner.query(`DROP INDEX \`IDX_05d080e931ec850c1e0219ee11\` ON \`product_attribute\``);
        await queryRunner.query(`DROP TABLE \`product_attribute\``);
    }

}
