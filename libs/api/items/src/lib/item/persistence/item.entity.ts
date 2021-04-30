import { CheckResult, CheckTemplate, Item, ItemGroup, Partner, StorageContainer } from '@system4blue/api-interfaces';
import { CheckResultEntity, CheckTemplateEntity } from '@system4blue/api/checks';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from 'typeorm';
import { StorageContainerEntity } from '@system4blue/api/storage';
import { ItemState } from '@system4blue/api-interfaces';
import { PartnerEntity } from '@system4blue/api/partners';
import { ItemGroupEntity } from '../../itemgroup/persistence/itemgroup.entity';

@Entity()
@TableInheritance({column: { type: 'varchar', name: 'type'}})
export abstract class ItemEntity implements Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  externalId: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @Column({nullable: true})
  price?: number;

  @Column({type: 'date', nullable: true})
  expiration?: string;

  @Column({type: 'date', nullable: true})
  producedAt?: string;

  @ManyToOne(() => PartnerEntity)
  producer?: Partner;

  @ManyToOne(() => PartnerEntity)
  seller?: Partner;

  @ManyToOne(() => StorageContainerEntity, container => container.items)
  storageLocation?: StorageContainer;

  @ManyToOne(() => ItemGroupEntity, group => group.items)
  itemGroup?: ItemGroup;

  @ManyToOne(() => CheckTemplateEntity)
  checkTemplate?: CheckTemplate;

  @OneToMany(() => CheckResultEntity, result => result.item)
  checkResults: CheckResult[];

  @Column({type: 'enum', enum: ItemState, default: ItemState.UNKNOWN})
  state: ItemState;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
