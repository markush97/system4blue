import {Entity, Tree, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, OneToMany, UpdateDateColumn, CreateDateColumn, Unique} from "typeorm";
import {Item, StorageContainer, StorageType} from '@system4blue/api-interfaces';
import {ItemEntity} from '@system4blue/api/items';

@Entity()
@Tree('nested-set')
@Unique(['parentContainer', 'name'])
export class StorageContainerEntity implements StorageContainer {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'enum', enum: StorageType, default: StorageType.OTHER})
  type: StorageType;

  @Column({nullable: true})
  description?: string;

  @TreeChildren()
  subContainers: StorageContainer[];

  @TreeParent()
  parentContainer: StorageContainer | "root";

  @OneToMany(() => ItemEntity, item => item.storageLocation)
  items: Item[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  name: string;

}
