import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import SubModule from '@modules/sub-modules/infra/typeorm/entities/SubModule';

@Entity('sub-modules')
class Question {
  @PrimaryColumn()
  id: string;

  @Column()
  sub_module_id: string;

  @ManyToOne(() => SubModule)
  @JoinColumn({ name: 'sub_module_id' })
  subModule: SubModule;

  @Column()
  statement: string;

  @Column()
  right_letter: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Question;
