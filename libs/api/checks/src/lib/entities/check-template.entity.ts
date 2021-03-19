import { CheckResult, CheckTemplate } from "@system4blue/api-interfaces";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CheckResultEntity } from "./check-result.entity";

@Entity()
export class CheckTemplateEntity implements CheckTemplate {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => CheckResultEntity,
    result => result.template
    )
  checkResults: CheckResult[];

  @Column({type: 'simple-array', default: ' '})
  checks: string[];

  @Column({nullable: true})
  notice?: string;

  @Column({nullable: true})
  description?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
