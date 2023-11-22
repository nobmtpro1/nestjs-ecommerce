import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700627326975 implements MigrationInterface {
    name = 'Migration1700627326975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_fd8cc793b365abd9278e0ac5d15\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP COLUMN \`ward_code\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD \`ward_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_fd8cc793b365abd9278e0ac5d15\` FOREIGN KEY (\`ward_code\`) REFERENCES \`address_ward\`(\`ward_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
