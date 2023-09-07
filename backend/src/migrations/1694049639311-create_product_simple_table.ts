import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductSimpleTable1694049639311 implements MigrationInterface {
    name = 'CreateProductSimpleTable1694049639311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_simple_data\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`regularPrice\` bigint NOT NULL DEFAULT '0', \`salePrice\` bigint NOT NULL DEFAULT '0', \`salePriceFrom\` date NULL, \`salePriceTo\` date NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`simpleDataId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD UNIQUE INDEX \`IDX_0efd6340f1fc94128557566fef\` (\`simpleDataId\`)`);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0efd6340f1fc94128557566fef\` ON \`product\` (\`simpleDataId\`)`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0efd6340f1fc94128557566fef9\` FOREIGN KEY (\`simpleDataId\`) REFERENCES \`product_simple_data\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0efd6340f1fc94128557566fef9\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b1b332c0f436897f21a960f26c7\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_569b30aa4b0a1ad42bcd30916aa\``);
        await queryRunner.query(`ALTER TABLE \`product_category\` DROP FOREIGN KEY \`FK_f38e86bd280ff9c9c7d9cb78393\``);
        await queryRunner.query(`DROP INDEX \`REL_0efd6340f1fc94128557566fef\` ON \`product\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b1b332c0f436897f21a960f26c7\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`parentId\` \`parentId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` CHANGE \`imageId\` \`imageId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_569b30aa4b0a1ad42bcd30916aa\` FOREIGN KEY (\`parentId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_category\` ADD CONSTRAINT \`FK_f38e86bd280ff9c9c7d9cb78393\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP INDEX \`IDX_0efd6340f1fc94128557566fef\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`simpleDataId\``);
        await queryRunner.query(`DROP TABLE \`product_simple_data\``);
    }

}
