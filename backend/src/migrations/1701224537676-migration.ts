import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701224537676 implements MigrationInterface {
    name = 'Migration1701224537676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_29d6df815a78e4c8291d3cf5e53\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD UNIQUE INDEX \`IDX_29d6df815a78e4c8291d3cf5e5\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_29d6df815a78e4c8291d3cf5e5\` ON \`user_address\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_29d6df815a78e4c8291d3cf5e53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP FOREIGN KEY \`FK_29d6df815a78e4c8291d3cf5e53\``);
        await queryRunner.query(`DROP INDEX \`REL_29d6df815a78e4c8291d3cf5e5\` ON \`user_address\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` DROP INDEX \`IDX_29d6df815a78e4c8291d3cf5e5\``);
        await queryRunner.query(`ALTER TABLE \`user_address\` ADD CONSTRAINT \`FK_29d6df815a78e4c8291d3cf5e53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
