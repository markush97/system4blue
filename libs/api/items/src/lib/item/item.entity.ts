import { CheckResult, Item, ItemGroup, StorageContainer } from '@system4blue/api-interfaces';
import { CheckResultEntity } from '@system4blue/api/checks';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemGroupEntity } from '../itemgroup/itemgroup.entity';
import { StorageContainerEntity } from '@system4blue/api/storage';

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

  @ManyToOne(() => StorageContainerEntity, container => container.items)
  storageLocation?: StorageContainer;

  @ManyToOne(
    () => ItemGroupEntity,
    itemGroup => itemGroup.items,
  )
  @JoinColumn({ name: 'item_group_id' })
  itemGroup?: ItemGroup;

  @OneToMany(
    () => CheckResultEntity,
    result => result.item
  )
  checkResults: CheckResult[];

  @Column({unique: true})
  externalId: string;

}
