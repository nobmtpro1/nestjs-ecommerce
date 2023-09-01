import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGalleryColumnToProductTable1693554749277 implements MigrationInterface {
    name = 'AddGalleryColumnToProductTable1693554749277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`image\` \`imageId\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`src\` longtext NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_gallery_image\` (\`productId\` varchar(36) NOT NULL, \`imageId\` varchar(36) NOT NULL, INDEX \`IDX_daea0f368d3f613870971323c3\` (\`productId\`), INDEX \`IDX_c0aa6061f3ea7d75a6f6466d35\` (\`imageId\`), PRIMARY KEY (\`productId\`, \`imageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`imageId\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_b1b332c0f436897f21a960f26c\` (\`imageId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b1b332c0f436897f21a960f26c\` ON \`product\` (\`imageId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` ADD CONSTRAINT \`FK_daea0f368d3f613870971323c38\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` ADD CONSTRAINT \`FK_c0aa6061f3ea7d75a6f6466d354\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` DROP FOREIGN KEY \`FK_c0aa6061f3ea7d75a6f6466d354\``);
        await queryRunner.query(`ALTER TABLE \`product_gallery_image\` DROP FOREIGN KEY \`FK_daea0f368d3f613870971323c38\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`DROP INDEX \`REL_b1b332c0f436897f21a960f26c\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_b1b332c0f436897f21a960f26c\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`imageId\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`imageId\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_c0aa6061f3ea7d75a6f6466d35\` ON \`product_gallery_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_daea0f368d3f613870971323c3\` ON \`product_gallery_image\``);
        await queryRunner.query(`DROP TABLE \`product_gallery_image\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`image\` varchar(255) NOT NULL`);
    }

}
