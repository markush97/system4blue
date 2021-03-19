import { CheckResult, Item, ItemGroup } from '@system4blue/api-interfaces';
import { CheckResultEntity } from '@system4blue/checks';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemGroupEntity } from '../itemgroup/itemgroup.entity';

@Entity()
export class ItemEntity implements Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @Column({nullable: true})
  price?: number;

  @Column({nullable: true})
  expiration?: string;

  @Column({nullable: true})
  location?: string;

  @ManyToOne(
    () => ItemGroupEntity,
    itemGroup => itemGroup.items,
  )
  @JoinColumn({ name: 'item_group_id' })
  itemGroup?: ItemGroup;

  @OneToMany(
    () => CheckResultEntity,
    check => check.item,
  )
  checks: CheckResult[];

  @Column({unique: true})
  externalId: string;

}
