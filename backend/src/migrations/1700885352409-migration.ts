import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700885352409 implements MigrationInterface {
    name = 'Migration1700885352409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_79ac751931054ef450a2ee4777\` ON \`user_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_79ac751931054ef450a2ee4777\` ON \`user_token\` (\`user_id\`)`);
    }

}
