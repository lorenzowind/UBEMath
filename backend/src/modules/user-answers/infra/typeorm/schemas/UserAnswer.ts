import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('user-answers')
class UserAnswer {
  @ObjectIdColumn()
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  question_id: string;

  @Column()
  answer_letter: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserAnswer;
