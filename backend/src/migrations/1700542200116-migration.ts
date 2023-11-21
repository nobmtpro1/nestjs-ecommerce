import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700542200116 implements MigrationInterface {
    name = 'Migration1700542200116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_2e5f7289b142837b71b4aa17dc4\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_2e5f7289b142837b71b4aa17dc4\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_2e5f7289b142837b71b4aa17dc4\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_2e5f7289b142837b71b4aa17dc4\` FOREIGN KEY (\`province_code\`) REFERENCES \`address_province\`(\`province_code\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
