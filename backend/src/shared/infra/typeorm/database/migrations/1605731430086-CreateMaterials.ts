import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateMaterials1605731430086
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'materials',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'sub_module_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'order',
            type: 'smallint',
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
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

    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        name: 'MaterialSubModule',
        columnNames: ['sub_module_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sub-modules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('materials', 'MaterialSubModule');

    await queryRunner.dropTable('materials');
  }
}
