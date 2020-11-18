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

@Entity('materials')
class Material {
  @PrimaryColumn()
  id: string;

  @Column()
  sub_module_id: string;

  @ManyToOne(() => SubModule)
  @JoinColumn({ name: 'sub_module_id' })
  sub_module: SubModule;

  @Column()
  order: number;

  @Column()
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Material;
