import { Item, ItemGroup } from "@system4blue/api-interfaces";
import { unit } from "@system4blue/types";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "../item/item.entity";

@Entity()
export class ItemGroupEntity implements ItemGroup {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @Column({nullable: true})
  expiration?: string;

  @Column({nullable: true})
  location?: string;

  @Column({type: 'varchar', nullable: true})
  unit: unit;

  @Column({nullable: true})
  amount?: number;

  @Column({nullable: true})
  minAmount?: number;

  @Column({nullable: true})
  maxAmount?: number;

  @OneToMany(
    () => ItemEntity,
    items => items.itemGroup,
  )
  items?: Item[];

  @Column({nullable: true})
  defaultLifespan?: number;

  @Column({nullable: true})
  price?: number;

}
