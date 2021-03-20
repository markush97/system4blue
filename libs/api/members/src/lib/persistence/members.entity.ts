import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Member } from '@system4blue/api-interfaces';

@Entity()
export class MemberEntity implements Member {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  externalId: string;

  @Column({nullable: true})
  street?: string;

  @Column({nullable: true})
  country?: string;

  @Column({nullable: true})
  zip?: number;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  phone?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;


}

