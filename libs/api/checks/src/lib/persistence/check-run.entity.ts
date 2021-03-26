import { CheckResult, CheckRun, CheckTemplate, Member, Partner } from '@system4blue/api-interfaces';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MemberEntity } from '@system4blue/api/members';
import { CheckTemplateEntity } from './check-template.entity';
import { CheckResultEntity } from './check-result.entity';

@Entity()
export class CheckRunEntity implements CheckRun {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => MemberEntity)
  checker: Member;

  @ManyToOne(() => MemberEntity)
  responsible: Member;

  @Column({type: 'date', update: false})
  date: string;

  @ManyToOne(() => CheckTemplateEntity)
  template: CheckTemplate;

  @OneToMany(() => CheckResultEntity, result => result.checkRun)
  checkResults: CheckResult[];

  @Column({nullable: true})
  note?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}
