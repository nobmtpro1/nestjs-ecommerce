import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductCategoryTable1693730455989 implements MigrationInterface {
    name = 'CreateProductCategoryTable1693730455989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_b1b332c0f436897f21a960f26c\` ON \`product\``);
        await queryRunner.query(`CREATE TABLE \`product_category\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`slug\` varchar(1000) NOT NULL, \`description\` longtext NOT NULL, \`imageId\` varchar(36) NULL, \`parentId\` varchar(36) NULL, UNIQUE INDEX \`REL_f38e86bd280ff9c9c7d9cb7839\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_categories_product_category\` (\`productId\` varchar(36) NOT NULL, \`productCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_37c2bc279249bec81521f8fe89\` (\`productId\`), INDEX \`IDX_8862dee67b712ea20963c464e8\` (\`productCategoryId\`), PRIMARY KEY (\`productId\`, \`productCategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`isActive\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`slug\` varchar(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` ADD CONSTRAINT \`FK_37c2bc279249bec81521f8fe89b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` ADD CONSTRAINT \`FK_8862dee67b712ea20963c464e88\` FOREIGN KEY (\`productCategoryId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` DROP FOREIGN KEY \`FK_8862dee67b712ea20963c464e88\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` DROP FOREIGN KEY \`FK_37c2bc279249bec81521f8fe89b\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`DROP INDEX \`IDX_8862dee67b712ea20963c464e8\` ON \`product_categories_product_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_37c2bc279249bec81521f8fe89\` ON \`product_categories_product_category\``);
        await queryRunner.query(`DROP TABLE \`product_categories_product_category\``);
        await queryRunner.query(`DROP INDEX \`REL_f38e86bd280ff9c9c7d9cb7839\` ON \`product_category\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_b1b332c0f436897f21a960f26c\` ON \`product\` (\`imageId\`)`);
    }

}
