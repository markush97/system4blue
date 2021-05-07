import { CheckTemplate } from "@system4blue/api-interfaces";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CheckTemplateEntity implements CheckTemplate {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name?: string;

  @Column({type: 'simple-array', default: ' '})
  checks?: string[];

  @Column({nullable: true})
  description?: string;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}
