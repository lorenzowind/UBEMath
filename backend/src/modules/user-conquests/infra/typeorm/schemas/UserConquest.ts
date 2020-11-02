import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('user-conquests')
class UserConquest {
  @ObjectIdColumn()
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  conquest_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserConquest;
