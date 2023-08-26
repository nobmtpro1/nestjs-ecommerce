import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1693025709039 implements MigrationInterface {
    name = 'CreateProductTable1693025709039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`updatedAt\` datetime NULL, \`createdAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`shortDescription\` varchar(1000) NOT NULL, \`description\` longtext NOT NULL, \`type\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
