import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1597976431961 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(255)',
          },
          {
            name: 'position',
            type: "enum('usuario', 'admin')",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
