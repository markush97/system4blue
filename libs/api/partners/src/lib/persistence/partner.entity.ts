import {Partner} from '@system4blue/api-interfaces';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PartnerEntity implements Partner {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  street?: string;

  @Column({nullable: true})
  country?: string;

  @Column({nullable: true})
  zip?: number;

  @Column({nullable: true})
  contactPhone?: string;

  @Column({nullable: true})
  contactName?: string;

  @Column({nullable: true})
  contactEmail?: string;

  @Column({nullable: true})
  webpage?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({length: 1000, type: 'varchar'})
  description?: string;

}
