import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemEntity } from '@system4blue/api/items';
import { CheckResult, CheckTemplate, Item } from '@system4blue/api-interfaces';
import { CheckTemplateEntity } from './check-template.entity';


@Entity()
export class CheckResultEntity implements CheckResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  notice?: string;

  @Column()
  checker: string;

  @Column({ type: 'simple-array', default: '' })
  successfullChecks: string[];

  @Column({ type: 'simple-array', default: '' })
  failedChecks: string[];

  @ManyToOne(
    () => CheckTemplateEntity,
    template => template.checkResults
  )
  @JoinColumn({name: 'template_id'})
  template: CheckTemplate;

  @ManyToOne(
    () => ItemEntity,
    item => item.checkResults,
    {eager: true}
  )
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column({name: 'item_id'})
  itemId: string;

  @CreateDateColumn()
  date: string;

  @Column({name: 'template_id'})
  templateId: string;

}
