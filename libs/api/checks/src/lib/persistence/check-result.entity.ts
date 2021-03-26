import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ItemEntity } from '@system4blue/api/items';
import { CheckResult, CheckRun, Item } from '@system4blue/api-interfaces';
import { CheckRunEntity } from './check-run.entity';


@Entity()
export class CheckResultEntity implements CheckResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-array', default: '' })
  successfullChecks: string[];

  @Column({ type: 'simple-array', default: '' })
  failedChecks: string[];

  @ManyToOne(
    () => ItemEntity,
    item => item.checkResults,
    {eager: true}
  )
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => CheckRunEntity, run => run.checkResults)
  @JoinColumn({ name: 'checkrun_id' })
  checkRun: CheckRun;

  @Column({nullable: true})
  note?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}
