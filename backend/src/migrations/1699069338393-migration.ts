import { MigrationInterface, QueryRunner } from "typeorm"

export class Migration1699069338393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`product_simple_data\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`product_simple_data\``);
    }

}
