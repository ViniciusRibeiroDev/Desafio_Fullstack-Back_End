import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1690523234601 implements MigrationInterface {
    name = 'InitialMigration1690523234601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "nomeCompleto" character varying(80) NOT NULL, "email" character varying(80) NOT NULL, "password" character varying NOT NULL, "telefone" character varying(25), "dataDeRegistro" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "nomeCompleto" character varying(80) NOT NULL, "email" character varying(80), "telefone" character varying(25), "dateTime" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
