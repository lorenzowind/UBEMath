import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('user-progress')
class UserProgress {
  @ObjectIdColumn()
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  sub_module_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserProgress;
