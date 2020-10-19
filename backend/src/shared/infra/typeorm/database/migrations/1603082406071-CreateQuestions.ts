import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateQuestions1603082406071
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
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
            name: 'statement',
            type: 'varchar(255)',
          },
          {
            name: 'right_letter',
            type: 'varchar(2)',
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
      'questions',
      new TableForeignKey({
        name: 'QuestionSubModule',
        columnNames: ['sub_module_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sub-modules',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('questions', 'QuestionSubModule');

    await queryRunner.dropTable('questions');
  }
}
