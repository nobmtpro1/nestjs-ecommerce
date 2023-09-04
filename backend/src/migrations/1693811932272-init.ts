import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1693811932272 implements MigrationInterface {
    name = 'Init1693811932272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`src\` longtext NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_tag\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_category\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`slug\` varchar(1000) NOT NULL, \`description\` longtext NOT NULL, \`imageId\` varchar(36) NULL, \`parentId\` varchar(36) NULL, UNIQUE INDEX \`REL_f38e86bd280ff9c9c7d9cb7839\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`shortDescription\` varchar(1000) NOT NULL, \`description\` longtext NOT NULL, \`type\` int NOT NULL DEFAULT '1', \`status\` int NOT NULL DEFAULT '1', \`slug\` varchar(1000) NOT NULL, \`imageId\` varchar(36) NULL, UNIQUE INDEX \`REL_b1b332c0f436897f21a960f26c\` (\`imageId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_gallery_image\` (\`productId\` varchar(36) NOT NULL, \`imageId\` varchar(36) NOT NULL, INDEX \`IDX_daea0f368d3f613870971323c3\` (\`productId\`), INDEX \`IDX_c0aa6061f3ea7d75a6f6466d35\` (\`imageId\`), PRIMARY KEY (\`productId\`, \`imageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_categories_product_category\` (\`productId\` varchar(36) NOT NULL, \`productCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_37c2bc279249bec81521f8fe89\` (\`productId\`), INDEX \`IDX_8862dee67b712ea20963c464e8\` (\`productCategoryId\`), PRIMARY KEY (\`productId\`, \`productCategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_tags_product_tag\` (\`productId\` varchar(36) NOT NULL, \`productTagId\` varchar(36) NOT NULL, INDEX \`IDX_d60d217a0b4eae73027a3d7e9f\` (\`productId\`), INDEX \`IDX_193456ebc5cb26486946cea095\` (\`productTagId\`), PRIMARY KEY (\`productId\`, \`productTagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` ADD CONSTRAINT \`FK_daea0f368d3f613870971323c38\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` ADD CONSTRAINT \`FK_c0aa6061f3ea7d75a6f6466d354\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` ADD CONSTRAINT \`FK_37c2bc279249bec81521f8fe89b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` ADD CONSTRAINT \`FK_8862dee67b712ea20963c464e88\` FOREIGN KEY (\`productCategoryId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_tags_product_tag\` ADD CONSTRAINT \`FK_d60d217a0b4eae73027a3d7e9f3\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_tags_product_tag\` ADD CONSTRAINT \`FK_193456ebc5cb26486946cea0958\` FOREIGN KEY (\`productTagId\`) REFERENCES \`product_tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_tags_product_tag\` DROP FOREIGN KEY \`FK_193456ebc5cb26486946cea0958\``);
        await queryRunner.query(`ALTER TABLE \`product_tags_product_tag\` DROP FOREIGN KEY \`FK_d60d217a0b4eae73027a3d7e9f3\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` DROP FOREIGN KEY \`FK_8862dee67b712ea20963c464e88\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_product_category\` DROP FOREIGN KEY \`FK_37c2bc279249bec81521f8fe89b\``);
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` DROP FOREIGN KEY \`FK_c0aa6061f3ea7d75a6f6466d354\``);
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` DROP FOREIGN KEY \`FK_daea0f368d3f613870971323c38\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`DROP INDEX \`IDX_193456ebc5cb26486946cea095\` ON \`product_tags_product_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_d60d217a0b4eae73027a3d7e9f\` ON \`product_tags_product_tag\``);
        await queryRunner.query(`DROP TABLE \`product_tags_product_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_8862dee67b712ea20963c464e8\` ON \`product_categories_product_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_37c2bc279249bec81521f8fe89\` ON \`product_categories_product_category\``);
        await queryRunner.query(`DROP TABLE \`product_categories_product_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_c0aa6061f3ea7d75a6f6466d35\` ON \`product_gallery_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_daea0f368d3f613870971323c3\` ON \`product_gallery_image\``);
        await queryRunner.query(`DROP TABLE \`product_gallery_image\``);
        await queryRunner.query(`DROP INDEX \`REL_b1b332c0f436897f21a960f26c\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_f38e86bd280ff9c9c7d9cb7839\` ON \`product_category\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
        await queryRunner.query(`DROP TABLE \`product_tag\``);
        await queryRunner.query(`DROP TABLE \`image\``);
    }

}
