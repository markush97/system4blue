import { Item, ItemGroup } from '@system4blue/api-interfaces';
import { UUID4 } from '@system4blue/types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    type => ItemGroupEntity,
    itemGroup => itemGroup.items,
  )
  @JoinColumn({ name: 'item_group_id' })
  itemGroup?: ItemGroup;

}
